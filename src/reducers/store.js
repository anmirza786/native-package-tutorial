import {combineReducers, configureStore} from '@reduxjs/toolkit';
import User from './slices/UserSlice';
import Theme from './slices/ThemeSlice';
import FilesData from './slices/FilesDataSlice';
import MasterData from './slices/MasterSlice';

const store = configureStore({
  reducer: combineReducers({User, Theme, FilesData, MasterData}),
});

export const {dispatch, getState} = store;

export default store;
