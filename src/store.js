import { configureStore } from "@reduxjs/toolkit";
import jokeSlice from "./jokeSlice";

const store = configureStore({
    reducer:{//here add slicer
        joke:jokeSlice.reducer//jokes->reducer have slice.reducer
    }
})

export default store