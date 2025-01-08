import { createSlice } from '@reduxjs/toolkit';
import {ProjectsCategories} from "@/lib/models/projectsCategories";

interface ProjectsCategoriesState {
    allProjectsCategories: ProjectsCategories[]
}

const initialState: ProjectsCategoriesState = {
    allProjectsCategories: []
};

const projectCategories = createSlice({
    name: 'projectCategories',
    initialState,
    reducers: {
        PROJECTS_CATEGORIES_FETCH_REQUESTED: (state) => {
        },
        PROJECTS_CATEGORIES_FETCH_RESPONSE_SUCCESS: (state, action) => {
            state.allProjectsCategories = action.payload;
        },
    }
});

export const {
    PROJECTS_CATEGORIES_FETCH_REQUESTED,
    PROJECTS_CATEGORIES_FETCH_RESPONSE_SUCCESS,
} = projectCategories.actions;
export default projectCategories.reducer;