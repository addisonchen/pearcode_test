import { createStore, combineReducers } from "redux";


function root_reducer(state, action) {
    return state;
}

let store = createStore(root_reducer);
export default store;