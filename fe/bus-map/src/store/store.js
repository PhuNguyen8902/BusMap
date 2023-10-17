
import { configureStore } from "@reduxjs/toolkit";
import storeRoutesReducer from "./features/storeRoute/storeRouteSlice";
import storeMakersReducer from "./features/storeRoute/storeMakersSlice";
import createSagaMiddleWare from "redux-saga";
import authSlice from "./features/auth/authSlice";
import mySaga from "./saga";

const sagaMiddleWare = createSagaMiddleWare();

export const store = configureStore({
    reducer:{
        storeRoute: storeRoutesReducer,
        storeMarkers: storeMakersReducer,
        auth: authSlice,
    },
    middleware: [sagaMiddleWare],
});

// khi bat trang web, hay tac dong toi cac reducer trong store
sagaMiddleWare.run(mySaga);
const token = JSON.parse(localStorage.getItem("token"));

if (token) {
  store.dispatch({
    type: "FETCH_INFO",
  });
}