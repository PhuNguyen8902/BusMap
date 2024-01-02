// import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';
// import authSlice from './slices/authSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import mySaga from './saga';

// const sagaMiddleware = createSagaMiddleware();

// const init = async () => {
//   const token = await AsyncStorage.getItem('auth');

//   const store = configureStore({
//     reducer: {
//       auth: authSlice,
//     },
//     middleware: [...getDefaultMiddleware(), sagaMiddleware],
//   });

//   sagaMiddleware.run(mySaga);

//   if (token) {
//     store.dispatch({
//       type: 'FETCH_INFO',
//     });
//   }
// };

// init();
import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
// import rootReducer from '../reducers/rootReducer';
import authSlice from './slices/authSlice';
import mySaga from './saga';

const reducer = combineReducers({
  auth: authSlice,
});

const sagaMiddleware = createSagaMiddleware();

// Apply middleware and create the store
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

export default store;
