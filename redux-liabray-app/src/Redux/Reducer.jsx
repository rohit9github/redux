import { ADD_TODO, DELETE_TODO, EDIT_TODO, GET_TODO } from "./ActionType";



function Reducer(state, action) {
    switch (action.type) {
        case ADD_TODO:
            return { ...state, todo: [state.todo, action.payload] };
        case GET_TODO:
            return { ...state, todo: action.payload };
        case DELETE_TODO:
            return { ...state, todo: state.todo.filter((v) => v.id !== action.payload) }
        case EDIT_TODO:
           return {...state,todo:[state.todo,action.payload]}
        default:
            return state;
    }
}


export default Reducer;