import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import { RESET } from "../actions/type";


let appReducer= combineReducers({
  userReducer: UserReducer,
});

const initialState = appReducer({}, {})

export default (state, action) => {
  if (action.type === RESET) {
    state = initialState
  }

  return appReducer(state, action)
}
