import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import FolderReducer from "./FolderReducer";
import { RESET } from "../actions/type";


let appReducer= combineReducers({
  userReducer: UserReducer,
  folderReducer:FolderReducer,
});

const initialState = appReducer({}, {})

export default (state, action) => {
  if (action.type === RESET) {
    state = initialState
  }

  return appReducer(state, action)
}
