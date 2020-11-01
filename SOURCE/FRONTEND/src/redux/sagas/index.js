import {
  watchGetUser,
} from "./NetworkSaga";

export default function* rootSaga() {
  yield watchGetUser;
}
