import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: null,
};

const User = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const {setUserData} = User.actions;

export default User.reducer;
