import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import MovieSlice from "./MovieSlice";

const ReduxStore = configureStore({
    reducer:{
        user: UserSlice.reducer,
        movies: MovieSlice.reducer,
    }
});

export default ReduxStore;