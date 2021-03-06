import {
    DATA_LOAD_BEGIN,
    DATA_LOAD_FAILURE,
    DATA_LOAD_SUCCESS, 
    DATA_RELOAD,
    DATA_TIME_ELAPSED_INCREMENT,
    DataLoadBeginType, DataLoadFailureType, DataLoadSuccessType, DataReloadType, DATA_SEARCH_CHANGED, DataSearchChangedType
} from '../actions/data';
import {AnyAction} from "redux";

/**
 * Here, data stores all information related to fields. When the server loads info for a field,
 * it is cached in data under that field name.
 * 
 * When a field is re-requested, it is loaded from cache unless explicitly reloaded.
 */

// Interfaces representing the shape of various data in the store.

// The data portion of state as a whole. 
export interface DataState {
    store: { [key: string]: DataField },
    search: string,
    timeElapsed: number,
    loaded: boolean,
    loading: boolean,
    error: boolean
}


// Data related to a particular field, e.g. 'age'
export interface DataField {
    field: string,
    rows: DataRow[],
    excessRows: number
}

// One value of a particular field.
export interface DataRow {
    value: string,
    age: number,
    count: number
}

// The initial state of the data property.
const initialState: DataState = {
    store: {},
    search: '',
    timeElapsed: 0,
    loaded: false,
    loading: false,
    error: false


}

export default function dataReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case DATA_LOAD_BEGIN:
            return {
                ...state,
                loaded: false,
                loading: true,
                error: false
            }
            break;

        case DATA_LOAD_SUCCESS:
            const newStore = {...state.store}
            newStore[(action as DataLoadSuccessType).payload.field] = (action as DataLoadSuccessType).payload
            return {
                ...state,
                store: newStore,
                timeElapsed: 0,
                loaded: true,
                loading: false,
                error: false
            }
            break;

        case DATA_LOAD_FAILURE:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: true
            }
            break;
            
        // When we reload, we just remove that data...a load will be triggered by the controller.
        case DATA_RELOAD:
            const reloadStore = {...state.store}
            delete reloadStore[(action as DataReloadType).payload];
            return {
                ...state,
                store: reloadStore
            }
            break;
        case DATA_SEARCH_CHANGED:
            return {
                ...state,
                search: (action as DataSearchChangedType).payload
            }
            break;
        
        case DATA_TIME_ELAPSED_INCREMENT:
            return{
                ...state,
                timeElapsed: state.timeElapsed + 1
            }
            break;
    }
    return state;
}