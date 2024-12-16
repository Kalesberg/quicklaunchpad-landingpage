import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  project: null
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
      updateSelectedProject: (state, action) => {
        state.project = action.payload;
      },
    },
  });
  
  export const {
    updateSelectedProject
  } = projectSlice.actions;
  export default projectSlice.reducer;
  