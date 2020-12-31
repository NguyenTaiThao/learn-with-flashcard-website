import {
  GET_USER,
  GET_FOLDER
} from "./type";

export const getUserInfo = (payload) => ({
  type: GET_USER,
  payload: payload,
});

export const getFolders = (payload) => ({
  type: GET_FOLDER,
  payload: payload,
});
