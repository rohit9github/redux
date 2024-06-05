import { legacy_createStore } from "redux";
import Reducer from "./Reducer";

let initialState = {
    todo:[]
}

export const store = legacy_createStore(Reducer,initialState)