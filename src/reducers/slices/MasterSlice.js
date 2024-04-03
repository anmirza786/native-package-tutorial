import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  countries: [],
  states: [],
  cities: [],
};

const Master = createSlice({
  name: 'MatserSlice',
  initialState,
  reducers: {
    setStates: (state, action) => {
      state.states = action.payload;
    },
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
  },
});

export const {setStates, setCities, setCountries} = Master.actions;

export default Master.reducer;
