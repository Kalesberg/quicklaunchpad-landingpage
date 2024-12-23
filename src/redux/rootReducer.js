import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    project: null,
    user: null,
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
        }
    },
});

export const { updateSelectedProject, updateUser } = slice.actions;
export default slice.reducer;
