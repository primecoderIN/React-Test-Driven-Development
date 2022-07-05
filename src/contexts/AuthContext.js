import { createContext, useContext, useReducer } from "react";
import { HANDLE_INPUT_CHANGE } from "../actions/LoginForm";
import AuthReducer from "../reducers/AuthReducer";

const initialState = {
  username: "",
  password: "",
};

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer( AuthReducer,initialState);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: HANDLE_INPUT_CHANGE, payload: { name, value } });
  };
  return (
    <AuthContext.Provider value={{ ...state, handleInputChange }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = ()=> useContext(AuthContext);
