import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import type { RootState } from '../store';

interface userState {
  isAuth: boolean;
  user?: User;
}

const initialState: userState = {
  isAuth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const selectAuthState = (state: RootState) => state.user.isAuth;
export default userSlice.reducer;
