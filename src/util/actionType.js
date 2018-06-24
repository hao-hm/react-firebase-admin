export const REQUEST_START = 'REQUEST_START';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_ERROR = 'REQUEST_ERROR';

export const FETCH_START = 'FETCH_START';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';

export const CREATE_START = 'CREATE_START';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_ERROR = 'CREATE_ERROR';


export const UPDATE_START = 'UPDATE_START';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_ERROR = 'UPDATE_ERROR';


export const DELETE_START = 'DELETE_START';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_ERROR = 'DELETE_ERROR';

export const CHANGE_MODE = 'CHANGE_MODE';
export const VIEW_MODE = 'VIEW_MODE';
export const CREATE_MODE = 'CREATE_MODE';
export const EDIT_MODE = 'EDIT_MODE';

export const SET_CURRENT = 'SET_CURRENT';
export const LOCAL_SEARCH = 'LOCAL_SEARCH';

const defaultTypes = [REQUEST_START, REQUEST_SUCCESS, REQUEST_ERROR,
  FETCH_START, FETCH_SUCCESS, FETCH_ERROR,
  CREATE_START, CREATE_SUCCESS, CREATE_ERROR,
  UPDATE_START, UPDATE_SUCCESS, UPDATE_ERROR,
  DELETE_START, DELETE_SUCCESS, DELETE_ERROR,
  CHANGE_MODE, SET_CURRENT, LOCAL_SEARCH];

export default function createActionType(namespace, constants = defaultTypes) {
  return Object.freeze(
    constants.reduce((obj, constant) => {
      return {
        ...obj,
        [constant]: `${namespace}/${constant}`
      }
    }, {})
  )
}