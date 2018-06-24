import get from 'lodash/get';

export default function (module){
  return {
    getCurrentMode: (state) => state[module].mode,
    getCurrentItem: (state) => state[module].current,
    getDataAsArray: (state) => Object.keys(state[module].data || {}).map(key => ({...state[module].data[key], key})),
    getData: (state) => get(state, `${module}.data`),
    getKeys: (state) => Object.keys(get(state, `${module}.data`, [])),
    getOne: (state, key) => get(state, `${module}.data.${key}`),
    getLoading: (state) => state[module].loading,
    getError: (state) => state[module].error,
    getSearch: (state) => state[module].search
  }
}