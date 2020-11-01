import { put, takeEvery, call } from "redux-saga/effects";
import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
} from "../actions/type";

// import * as API from "../../constants/Api";

export function* getUserInfor(payload) {
  try {
    const response = yield call();
    yield put({ type: GET_USER_SUCCESS, payload: response });
  } catch (err) {
    yield put({ type: GET_USER_FAIL, payload: err });
  }
}
export const watchGetUser = takeEvery(GET_USER, getUserInfor);

