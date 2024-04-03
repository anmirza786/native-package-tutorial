import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  toggleMenu: false,
  showLoader: false,
  btnLoader: false,
};

const ThemeSlice = createSlice({
  name: 'ThemeSlice',
  initialState,
  reducers: {
    setToggleMenu: (state, action) => {
      state.toggleMenu = action.payload;
    },
    setShowLoader: (state, action) => {
      state.showLoader = action.payload;
    },
    setBtnLoader: (state, action) => {
      state.btnLoader = action.payload;
    },
  },
});

export const {setToggleMenu, setShowLoader, setBtnLoader} = ThemeSlice.actions;

export default ThemeSlice.reducer;
