/**
 * ACTION TYPES
 */
import network, {API} from "../../network/network";
import {AxiosResponse} from "axios";
import {AnyAction} from "redux";

export const FIELDS_CHANGED = 'CHANGE_FIELD';

export const FIELDS_LOAD_BEGIN = 'FIELDS_LOAD_BEGIN';
export const FIELDS_LOAD_SUCCESS = 'FIELDS_LOAD_SUCCESS';
export const FIELDS_LOAD_FAILURE = 'FIELDS_LOAD_FAILURE';

export interface FieldsChangedType {
    type: string,
    payload: string
}

export interface FieldsLoadBeginType {
    type: string,
    payload: undefined
}

export interface FieldsLoadSuccessType {
    type: string,
    payload: string[]
}

export interface FieldsLoadFailureType {
    type: string,
    payload: number
}

/**
 * Action Creators
 */

export function fieldsChangedAction(field: string): FieldsChangedType {
    return {
        type: FIELDS_CHANGED,
        payload: field
    }
}

export function fieldsLoadBeginAction(): FieldsLoadBeginType {
    return {
        type: FIELDS_LOAD_BEGIN,
        payload: undefined
    }
}

export function fieldsLoadSuccessAction(options: string[]): FieldsLoadSuccessType {
    return {
        type: FIELDS_LOAD_SUCCESS,
        payload: options
    }
}

export function fieldsLoadFailureAction(err: number): FieldsLoadFailureType {
    return {
        type: FIELDS_LOAD_FAILURE,
        payload: err
    }
}

/*
    Load a list of possible fields to filter on from the server.
*/
export function asyncLoadFieldsAction() {
    return function (dispatch: (a: AnyAction) => void) {
        dispatch(fieldsLoadBeginAction())
        network.get('/fields')
            .then((value: AxiosResponse) => {
                dispatch(fieldsLoadSuccessAction(value.data.data.fields))
            })
            .catch(reason => {
                dispatch(fieldsLoadFailureAction(reason.response.status))
            })
    }
}
