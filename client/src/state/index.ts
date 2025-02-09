import { Lesson } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateTypes {
  courseEditor: {
    lessons: Lesson[];
    isLessonModalOpen: boolean;
    selectedLessonIndex: number | null;
    selectedLessonId: number | undefined;
  };
}

const initialState: InitialStateTypes = {
  courseEditor: {
    lessons: [],
    isLessonModalOpen: false,
    selectedLessonIndex: null,
    selectedLessonId: undefined,
  },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLessons: (state, action: PayloadAction<Lesson[]>) => {
      state.courseEditor.lessons = action.payload;
    },
    openLessonModal: (
      state,
      action: PayloadAction<{
        lessonIndex: number | null;
        lessonId: number | undefined;
      }>
    ) => {
      state.courseEditor.isLessonModalOpen = true;
      state.courseEditor.selectedLessonIndex = action.payload.lessonIndex;
      state.courseEditor.selectedLessonId = action.payload.lessonId;
    },
    closeLessonModal: (state) => {
      state.courseEditor.isLessonModalOpen = false;
      state.courseEditor.selectedLessonIndex = null;
      state.courseEditor.selectedLessonId = undefined;
    },
    addLesson: (state, action: PayloadAction<Lesson>) => {
      state.courseEditor.lessons.push(action.payload);
    },
    editLesson: (
      state,
      action: PayloadAction<{ lessonIndex: number; lesson: Lesson }>
    ) => {
      state.courseEditor.lessons[action.payload.lessonIndex] =
        action.payload.lesson;
    },
    deleteLesson: (state, action: PayloadAction<number>) => {
      state.courseEditor.lessons.splice(action.payload, 1);
    },
  },
});

export const {
  setLessons,
  openLessonModal,
  closeLessonModal,
  addLesson,
  editLesson,
  deleteLesson,
} = globalSlice.actions;
export default globalSlice.reducer;
