import {MODULE_NAME} from './constant';
import {createReducers} from '../util/createReducer';
import createInitialState from '../util/createInitialState';

const INITIAL_STATE = createInitialState(MODULE_NAME);
export default createReducers(INITIAL_STATE, MODULE_NAME);