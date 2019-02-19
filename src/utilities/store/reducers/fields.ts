import {
    FIELDS_CHANGED,
    FIELDS_LOAD_BEGIN, FIELDS_LOAD_FAILURE, FIELDS_LOAD_SUCCESS,
    FieldsChangedType, FieldsLoadBeginType,
    FieldsLoadFailureType,
    FieldsLoadSuccessType
} from "../actions/fields";
import {AnyAction} from "redux";

/**
 *  Fields store all the possible 'columns', or fields, that the data can be filtered by. 
 */

export interface FieldsState {
    options: string[],
    selected: string,
    loaded: boolean,
    loading: boolean,
    error: boolean
}

const initialState: FieldsState = {
    options: [],
    selected: '',
    loaded: false,
    loading: false,
    error: false
}

export default function fieldsReducer(state: FieldsState = initialState, action: AnyAction) {
    switch (action.type) {
        case FIELDS_CHANGED:
            return {
                ...state,
                selected: (action as FieldsChangedType).payload
            }
            break;
        case FIELDS_LOAD_BEGIN:
            return {
                ...state,
                loaded: false,
                loading: true,
                error: false
            }
            break;

        case FIELDS_LOAD_SUCCESS:
            return {
                ...state,
                loaded: true,
                loading: false,
                error: false,
                options: action.payload
            }
            break;
        case FIELDS_LOAD_FAILURE:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: true,
                options: []
            }
            break;
    }
    return state;
}