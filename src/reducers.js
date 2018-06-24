import { combineReducers } from 'redux';
import customer from './customer'
import room from './room'
import floor from './floor'

export default combineReducers({
  customer: customer.reducers,
  room: room.reducers,
  floor: floor.reducers
});