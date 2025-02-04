import { Course } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: [

        
  ],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload
    },
    removeCourse: (state, action: PayloadAction<number>) => {
      state.courses = state.courses.filter(course => course.id !== action.payload);
    },
    updateCourse: (state, action: PayloadAction<Course>) => {
      const index = state.courses.findIndex(course => course.id === action.payload.id);
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
  },
});

export const { addCourse, removeCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
