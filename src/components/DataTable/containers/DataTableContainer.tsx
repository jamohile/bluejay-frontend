import * as React from 'react';
import {connect} from 'react-redux';
import {StoreState} from "../../../utilities/store/reducers/root";
import {DataRow, DataState} from "../../../utilities/store/reducers/data";
import {asyncLoadDataAction, dataReloadAction, dataTimeElapsedIncrementAction} from "../../../utilities/store/actions/data";
import { DataTableView } from '../views/DataTableView';

// Have to use optional members since they are added in by Redux and would throw an error in App.tsx otherwise.
interface DataTableContainerProps {
    data?: DataState,
    selected?: string,
    timeElapsed?:number,
    loadDataField?: (field: string) => void;
    reloadDataField?:(field:string) => void;
    incrementTimeElapsed?: () => void;
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

    componentDidMount(){
        const incrementTimeElapsed = this.props.incrementTimeElapsed as () => void;
        setInterval(incrementTimeElapsed, 1000);
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

        const search = data.search;
        const timeElapsed = data.timeElapsed as number;

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

        // We load these into variables to both reduce complexity in JSX,
        // and to allow us to filter them more easily in JSX.
        let rows = loaded ? data.store[selected].rows : [];
        let excessRows = loaded ? data.store[selected].excessRows : 0;
        
        return (
            <DataTableView
                loaded={loaded}
                loading={loading}
                error={error}
                timeElapsed={timeElapsed}
                onReload={() => reloadDataField(selected)}
                /* Necessary because if we just triggered a load, the store will not have this field.*/
                rows = {filterRowsBySearch(rows, search)}
                excessRows = {excessRows}
                
            />
        )
    }

}

/* This filters rows based on the search query.
   Search structure is a one to many, any of.
   For example, search "College" matches value "College University"
   search "CollegeUniversity" does not match value "College University"
   search "College University" matches values "College" and "University" 
*/ 
function filterRowsBySearch(rows: DataRow[], search:string): DataRow[]{
    //If no search, wildcard.
    if(search == ''){
        return rows;
    }

    // Token multi-word searches into multiple possible matches
    const searchTokens = search.toLowerCase().split(' ');
    //Filter as described above.
    return rows.filter((r: DataRow) => {
        const val = r.value.toString().toLowerCase();
        for(let s of searchTokens){
            if(val.includes(s)){
                return true;
            }
        }
        return false;
    })
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
        reloadDataField: (field: string) => dispatch(dataReloadAction(field)),
        incrementTimeElapsed: () => dispatch(dataTimeElapsedIncrementAction())
    }


}

export default connect(mapStatetoProps, mapDispatchtoProps)(DataTableContainer);
