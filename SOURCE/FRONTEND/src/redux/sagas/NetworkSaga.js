import { put, takeEvery, call } from "redux-saga/effects";
import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  GET_FOLDER,
  GET_FOLDER_SUCCESS,
  GET_FOLDER_FAIL,
} from "../actions/type";

import reactotron from "reactotron-react-js"

import * as API from "@constants/Api";

//***************************** USER ******************************/
// GET INFO
export function* getUserInfo() {
  try {
    const response = yield call(API.requestGetUserInfo);
    yield put({ type: GET_USER_SUCCESS, payload: { response } });
  } catch (err) {
    yield put({ type: GET_USER_FAIL, payload: err });
  }
}

export function* getFolders(action) {
  try {
    const response = yield call(API.requestFolders, action.payload);
    yield put({ type: GET_FOLDER_SUCCESS, payload: { response } });
  } catch (err) {
    yield put({ type: GET_FOLDER_FAIL, payload: err });
  }
}


export const watchGetUser = takeEvery(GET_USER, getUserInfo);
export const watchGetFolder = takeEvery(GET_FOLDER, getFolders);

