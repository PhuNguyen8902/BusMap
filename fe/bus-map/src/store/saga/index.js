import { call, delay, put, takeLatest } from "redux-saga/effects";
import { setInfo, signOut } from "../features/auth/authSlice";
import userService from "../../service/userService";
// get user info
function* fetchInfo() {
  try {
    const response = yield call(userService.getInfo);
    if (!response.error) {
        // console.log("res: ", response)
        yield put(setInfo(response));
    } else {
      alert(response.error);
    }
    yield delay(500);
  } catch {
    yield delay(500);
  }
}
function* mySaga() {
  yield takeLatest("FETCH_INFO", fetchInfo);
}

export default mySaga;
