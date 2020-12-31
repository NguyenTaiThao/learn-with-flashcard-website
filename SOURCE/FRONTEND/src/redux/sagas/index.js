import {
  watchGetUser,
  watchGetFolder,
} from "./NetworkSaga";

export default function* rootSaga() {
  yield watchGetUser;
  yield watchGetFolder;
}
