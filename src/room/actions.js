import generateAction from '../util/createAction';
import {MODULE_NAME, API} from './constant';

const action = generateAction({module: MODULE_NAME, endpoint: API.rooms});

export default action;