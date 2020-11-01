import { GET_USER, GET_USER_SUCCESS, GET_USER_FAIL } from "../actions/type";

const initialState = {
  data: {},
  isLoading: true,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER: {
      return { ...state, isLoading: true };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      };
    }
    case GET_USER_FAIL: {
     
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}
