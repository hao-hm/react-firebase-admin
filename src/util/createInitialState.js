import {VIEW_MODE} from './actionType';
export default function () {
  return {
    data: {},
    page: 1,
    loading: 0,
    error: null,
    current: null,
    mode: VIEW_MODE,
    search: ''
  };
}