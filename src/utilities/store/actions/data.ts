/**
 * ACTION TYPES
 */
import {DataField} from "../reducers/data";
import network from "../../network/network";
import {AxiosResponse} from "axios";

export const DATA_LOAD_BEGIN = 'DATA_LOAD_BEGIN';
export const DATA_LOAD_SUCCESS = 'DATA_LOAD_SUCCESS';
export const DATA_LOAD_FAILURE = 'DATA_LOAD_FAILURE';
export const DATA_RELOAD = 'DATA_RELOAD';

export const DATA_SEARCH_CHANGED = 'DATA_SEARCH_CHANGED';

export const DATA_TIME_ELAPSED_INCREMENT = 'DATA_TIME_ELAPSED_INCREMENT';

/**
 * Action Types
 */
export interface DataLoadBeginType {
    type: string,
    payload: string
}

export interface DataLoadSuccessType {
    type: string,
    payload: DataField
}

export interface DataLoadFailureType {
    type: string,
    payload: number
}

export interface DataReloadType{
    type:string,
    payload: string
}

export interface DataSearchChangedType{
    type: string,
    payload: string
}
export interface DataTimeElapsedIncrementType{
    type: string
}

/**
 * Action Creators
 */

export function dataLoadBeginAction(field: string): DataLoadBeginType {
    return {
        type: DATA_LOAD_BEGIN,
        payload: field
    }
}

export function dataLoadSuccessAction(dataField: DataField): DataLoadSuccessType {
    return {
        type: DATA_LOAD_SUCCESS,
        payload: dataField
    }
}

export function dataLoadFailureAction(err: number): DataLoadFailureType {
    return {
        type: DATA_LOAD_FAILURE,
        payload: err
    }
}

/*
    Loads data for the selected from the server.
*/
export function asyncLoadDataAction(field: string) {
    return (dispatch: ({}) => void) => {
        dispatch(dataLoadBeginAction(field));
        network.get(`/data?field=${field}`)
            .then((value: AxiosResponse) => {
                dispatch(dataLoadSuccessAction(value.data.data));
            })
            .catch((err) => dispatch(dataLoadFailureAction(err)))
    }
}

export function dataReloadAction(field:string): DataReloadType{
    return{
        type: DATA_RELOAD,
        payload: field
    }
}

export function dataSearchChangedAction(search: string): DataSearchChangedType{
    return {
        type: DATA_SEARCH_CHANGED,
        payload: search
    }
}
export function dataTimeElapsedIncrementAction(): DataTimeElapsedIncrementType{
    return {
        type: DATA_TIME_ELAPSED_INCREMENT
    }
}

