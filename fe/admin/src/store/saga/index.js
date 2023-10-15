import { call, delay, put, takeLatest } from "redux-saga/effects";
import { setInfo, signOut } from "../slices/authSlice";
import { closeLoading, openLoading } from "../slices/pageSlice";
import userService from "../../service/userService";
// get user info
function* fetchInfo() {
  try {
    yield put(openLoading());
    const response = yield call(userService.getInfo);
    if (!response.error) {
      if (response.role == "ROLE_ADMIN") {
        yield put(setInfo(response));
      } else {
        alert("You need admin rights to log in");
        yield put(signOut());
      }
    } else {
      alert(response.error);
    }
    yield delay(500);
    yield put(closeLoading());
  } catch {
    yield delay(500);
    yield put(closeLoading());
  }
}

function* mySaga() {
  yield takeLatest("FETCH_INFO", fetchInfo);
}

export default mySaga;
