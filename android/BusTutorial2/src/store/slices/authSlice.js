import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isLogin: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn(state, action) {
      //   localStorage.setItem("token", JSON.stringify(action.payload));
      AsyncStorage.setItem('auth', JSON.stringify(action.payload));

      state.isLogin = true;
    },
    setInfo(state, action) {
      state.user = action.payload;
      state.isLogin = true;
    },
    signOut(state, action) {
      //   localStorage.removeItem("token");
      AsyncStorage.removeItem('auth');
      state.isLogin = false;
      state.user = {};
    },
  },
});

export const {signIn, signOut, setInfo} = authSlice.actions;
export default authSlice.reducer;
