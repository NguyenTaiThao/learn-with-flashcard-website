import { GET_FOLDER, GET_FOLDER_SUCCESS, GET_FOLDER_FAIL } from "../actions/type";

const initialState = {
  data: {},
  isLoading: true,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FOLDER: {
      return { ...state, isLoading: true };
    }
    case GET_FOLDER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload?.response?.data
      };
    }
    case GET_FOLDER_FAIL: {
     
      return {
        ...state,
        error: action.payload?.response?.err,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}
