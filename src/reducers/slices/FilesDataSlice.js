// deviceDataSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  filesData: null,
  scannedDocuments: null,
};

// Create a slice
const filesDataSlice = createSlice({
  name: 'deviceData',
  initialState,
  reducers: {
    setFilesData: (state, action) => {
      // Update the deviceData array with the new data
      state.filesData = action.payload;
    },
    setScannedDocuments: (state, action) => {
      state.scannedDocuments = action.payload;
    },
  },
});

// Export actions and reducer
export const { setFilesData, setScannedDocuments } = filesDataSlice.actions;
export default filesDataSlice.reducer;
