import {
  GET_USER
} from "./type";

export const getUserInfo = (payload) => ({
  type: GET_USER,
  payload: payload,
});
