import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project: null,
  user: null,
  myprojects: [],
  mylaunchInfo: [],
  upcomingProject: null,
  liveProjects: [],
  previousProjects: [],
};

const slice = createSlice({
  name: "project",
  initialState,
  reducers: {
    updateSelectedProject: (state, action) => {
      state.project = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateMyprojects: (state, action) => {
      state.myprojects = action.payload;
    },
    updateMylaunchInfo: (state, action) => {
      state.mylaunchInfo = action.payload;
    },
    updateUpcomingProject: (state, action) => {
      state.upcomingProject = action.payload;
    },
    updateLiveProjects: (state, action) => {
      state.liveProjects = action.payload;
    },
    updatePreviousProjects: (state, action) => {
      state.previousProjects = action.payload;
    },
  },
});

export const {
  updateSelectedProject,
  updateUser,
  updateMyprojects,
  updateMylaunchInfo,
  updateUpcomingProject,
  updateLiveProjects,
  updatePreviousProjects,
} = slice.actions;
export default slice.reducer;
