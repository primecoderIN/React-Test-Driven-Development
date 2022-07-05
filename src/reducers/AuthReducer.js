import { HANDLE_INPUT_CHANGE } from "../actions/LoginForm";


const AuthReducer = (state,action) => {
    if(action.type===HANDLE_INPUT_CHANGE){
        const {name,value} = action.payload;
        return {...state, [name]: value}
    }
 return state;
}

export default AuthReducer