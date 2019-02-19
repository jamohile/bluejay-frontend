import * as React from 'react';
import {connect} from 'react-redux';
import {StoreState} from "../../../utilities/store/reducers/root";
import {DataRow, DataState} from "../../../utilities/store/reducers/data";
import {asyncLoadDataAction, dataReloadAction} from "../../../utilities/store/actions/data";
import { DataTableView } from '../views/DataTableView';

// Have to use optional members since they are added in by Redux and would throw an error in App.tsx otherwise.
interface DataTableContainerProps {
    data?: DataState,
    selected?: string,
    loadDataField?: (field: string) => void;
    reloadDataField?:(field:string) => void;
}


/**
 * Responsible for:
 *      1) Triggering action to load data for a given fields from server.
 *      2) Providing all data to DataTableView
 *      3) Handling reload and passing it to redux.
 */
class DataTableContainer extends React.Component<DataTableContainerProps> {
    constructor(props: DataTableContainerProps) {
        super(props);
    }

    render() {
        // Declared individually for type assertion.
        const data:DataState = this.props.data as DataState;
        const selected = this.props.selected as string;
        const loadDataField = this.props.loadDataField as (field: string) => void;
        const reloadDataField = this.props.reloadDataField as (field:string) => void;

        // These are let, since we may manually change them if we trigger a reload.
        let loaded = data.loaded;
        let loading = data.loading;
        let error = data.error;

        /* Trigger a loading action if:
            1) data isn't loaded. 
            2) data isn't loading.
            3) There is a valid field selected.
            4) We don't have the selected field cached.
        */
        if (!loading && !error && selected != '' && data.store[selected] == undefined) {
            loadDataField(selected);
            loaded = false;
            loading = false;
        }

        return (
            <DataTableView
                loaded={loaded}
                loading={loading}
                error={error}
                onReload={() => reloadDataField(selected)}
                /* Necessary because if we just triggered a load, the store will not have this field.*/
                rows = {loaded ? data.store[selected].rows : []}
                excessRows = {loaded ? data.store[selected].excessRows : 0}
                
            />
        )
    }

}

const mapStatetoProps = (state: StoreState) => {
    return {
        data: state.data,
        selected: state.fields.selected
    }
}

const mapDispatchtoProps = (dispatch: ({}) => void) => {
    return {
        loadDataField: (field: string) => dispatch(asyncLoadDataAction(field)),
        reloadDataField: (field: string) => dispatch(dataReloadAction(field))
    }


}

export default connect(mapStatetoProps, mapDispatchtoProps)(DataTableContainer);
