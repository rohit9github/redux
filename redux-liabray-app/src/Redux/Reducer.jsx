import { ADD_TODO, GET_TODO } from "./ActionType";



function Reducer(state, action) {
    switch (action.type) {
        case ADD_TODO:
            return {...state,todo:[state.todo,action.payload]};
            case GET_TODO : 
            return {...state,todo:action.payload};
        default:
            return state;
    }
}


export default Reducer;