import {  User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TutorsState {
    tutors : User[]
}

const initialState: TutorsState = {
    tutors: [

    ]
}

const tutorsSlice = createSlice({
    name: 'Tutors',
    initialState,
    reducers: {
        addTutor: (state, action: PayloadAction<User[]>) => {
            state.tutors = action.payload
          },
        updateTutor: (state, action: PayloadAction<User>) => {
            const index = state.tutors.findIndex(tutor => tutor.id === action.payload.id)
            if(index !== -1){
                state.tutors[index] = action.payload
            }
        }
    }
})

export const { addTutor , updateTutor } = tutorsSlice.actions
export default tutorsSlice.reducer