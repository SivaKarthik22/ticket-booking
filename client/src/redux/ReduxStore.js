import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import MovieSlice from "./MovieSlice";
import TheatreSlice from "./TheatreSlice";

const ReduxStore = configureStore({
    reducer:{
        user: UserSlice.reducer,
        movies: MovieSlice.reducer,
        theatres: TheatreSlice.reducer,
    }
});

export default ReduxStore;