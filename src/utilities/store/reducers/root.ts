import {combineReducers} from "redux";

import dataReducer, {DataState} from './data';
import fieldsReducer, {FieldsState} from './fields';

export interface StoreState {
    fields: FieldsState,
    data: DataState
}

/**
 * fields stores the possible fields that can be selected, and their loading progress.
 * data stores data for specific fields, and their loading processes.
 */
const rootReducer = combineReducers({
    data: dataReducer,
    fields: fieldsReducer
});

export default rootReducer;