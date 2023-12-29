import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleWare from 'redux-saga';
import authSlice from './slices/authSlice';
import mySaga from './saga';

const sagaMiddleWare = createSagaMiddleWare();

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  // middleware: [sagaMiddleWare],
});

// khi bat trang web, hay tac dong toi cac reducer trong store
// sagaMiddleWare.run(mySaga);
// const token = JSON.parse(localStorage.getItem('token'));

// if (token) {
//   store.dispatch({
//     type: 'FETCH_INFO',
//   });
// }
