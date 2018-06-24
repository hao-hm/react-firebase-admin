import createActionType, {VIEW_MODE} from './actionType';
import database from '../database'

export function createAction(type, ...argNames) {
  return function(...args) {
    let action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    });
    return action
  }
}

export default function generateAction({module, endpoint}) {
  const ACTION_TYPE = createActionType(module);
  const action = {
    requestStart: createAction(ACTION_TYPE.REQUEST_START),
    requestSuccess: createAction(ACTION_TYPE.REQUEST_SUCCESS, 'data'),
    requestError: createAction(ACTION_TYPE.REQUEST_ERROR, 'error'),

    fetchStart: createAction(ACTION_TYPE.FETCH_START),
    fetchSuccess: createAction(ACTION_TYPE.FETCH_SUCCESS, 'data'),
    fetchError: createAction(ACTION_TYPE.FETCH_ERROR, 'error'),

    createStart: createAction(ACTION_TYPE.CREATE_START),
    createSuccess: createAction(ACTION_TYPE.CREATE_SUCCESS, 'data'),
    createError: createAction(ACTION_TYPE.CREATE_ERROR, 'error'),

    updateStart: createAction(ACTION_TYPE.UPDATE_START),
    updateSuccess: createAction(ACTION_TYPE.UPDATE_SUCCESS, 'data'),
    updateError: createAction(ACTION_TYPE.UPDATE_ERROR, 'error'),

    deleteStart: createAction(ACTION_TYPE.DELETE_START),
    deleteSuccess: createAction(ACTION_TYPE.DELETE_SUCCESS),
    deleteError: createAction(ACTION_TYPE.DELETE_ERROR, 'error'),

    changeMode: createAction(ACTION_TYPE.CHANGE_MODE, 'mode'),

    setCurrent: createAction(ACTION_TYPE.SET_CURRENT, 'current'),

    localSearch: createAction(ACTION_TYPE.LOCAL_SEARCH, 'text')

  };

  action.fetch = () => async (dispatch, getState) => {
    dispatch(action.fetchStart());
    return database.ref(endpoint).once('value', snap => {
      dispatch(action.fetchSuccess(snap.val()));
    })
      .catch((error) => {
        console.log(error);
        dispatch(action.fetchError(error));
      });
  };

  action.delete = ({url, key}) => async (dispatch, getState) => {
    try {
      dispatch(action.deleteStart());
      await database.ref(`${endpoint}/${key}`).remove();
      dispatch(action.deleteSuccess());
      const currentPage = getState()[module].page;
      dispatch(action.fetch({page: currentPage}));
    } catch(error) {
      dispatch(action.deleteError(error));
      throw error;
    }
  };

  action.create = ({url, body}) => async (dispatch) => {
    try {
      dispatch(action.createStart());
      const data = database.ref(endpoint).push(body);
      dispatch(action.createSuccess(data));
      dispatch(action.changeMode(VIEW_MODE));
      // dispatch(action.fetch());
    } catch(error) {
      dispatch(action.createError(error));
    }
  };

  action.update = ({url, key, body}) => async (dispatch) => {
    try {
      dispatch(action.updateStart());
      const data = await database.ref(`${endpoint}/${key}`).update(body);
      dispatch(action.updateSuccess(data));
      dispatch(action.changeMode(VIEW_MODE));
      // dispatch(action.fetch());
    } catch(error) {
      dispatch(action.updateError(error));
    }
  };

  action.updates = (updates) => async (dispatch) => {
    try {
      dispatch(action.updateStart());
      const data = await database.ref().update(updates);
      dispatch(action.updateSuccess(data));
      dispatch(action.changeMode(VIEW_MODE));
    } catch(error) {
      dispatch(action.updateError(error));
    }
  };


  action.request = (...requests) => async (dispatch) => {
    const all = requests.map(request => {
      return dispatch(request);
    });
    try {
      dispatch(action.requestStart());
      await Promise.all(all);
      dispatch(action.requestSuccess());
    } catch(error) {
      dispatch(action.requestError(error));
    }
  };

  return action;

}