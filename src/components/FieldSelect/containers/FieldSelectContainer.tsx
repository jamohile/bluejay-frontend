import * as React from 'react';
import {connect} from 'react-redux';
import {asyncLoadFieldsAction, fieldsChangedAction} from "../../../utilities/store/actions/fields";
import {StoreState} from "../../../utilities/store/reducers/root";
import {FieldSelectView} from "../views/FieldSelectView";
import {FieldsState} from "../../../utilities/store/reducers/fields";


// We have to use 'optional' members because they are added in by redux...therefore in App.tsx mandatory props throw an error.
interface FieldSelectContainerProps {
    onChange?: (field: string) => void;
    loadFields?: () => void;
    fields: FieldsState;
}

/**
 *  This class is responsible for:
 *      1) Triggering action to load possible fields from server if necessary.
 *      2) Provide the FieldSelectView with these options.
 *      3) Forward changes to selected field to redux.
 */

class FieldSelectContainer extends React.Component<FieldSelectContainerProps> {
    constructor(props: FieldSelectContainerProps) {
        super(props);
    }

    componentDidMount(){
        const {loaded, loading, error} = this.props.fields;
        const loadFields = this.props.loadFields as () => void;
        
        /**
         * When the app first starts, we won't yet have a list of possible filters.
         * Use an async action to load them, but only if we're not already loading.
         */
        if (!(loaded || loading || error)) {
            loadFields()
        }
    }

    render() {
        const {loaded, loading, selected, error, options} : FieldsState = this.props.fields;
        const onChange = this.props.onChange as (field:string) => void;

        /**
         * The first time we load the possible filter fields, we won't have selected anything.
         * It's more intuitive to have one selected and populated.
         * Use a thunk to select the first one automatically if possible.
         */
        if(loaded && !loading && selected == '' && options.length > 0){
          onChange(options[0]);
        }

        return (
                <FieldSelectView
                    fieldOptions={options}
                    onChange={onChange}
                    selected={selected}
                    loaded={loaded}
                    loading={loading}
                    error={error}
                />
        )
    }
}

/** Connect to redux store and get the field state specifically.*/
function mapStatetoProps(state: StoreState) {
    return {
        fields: state.fields
    }
}

function mapDispatchToProps(dispatch: ({}) => void) {
    return {
        //Handles changing the selected field.
        onChange: (field: string) => dispatch(fieldsChangedAction(field)),
        loadFields: () => dispatch(asyncLoadFieldsAction()),
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(FieldSelectContainer)

