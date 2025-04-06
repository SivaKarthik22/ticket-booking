import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import MovieSlice from "./MovieSlice";
import TheatreSlice from "./TheatreSlice";
import ShowSlice from "./ShowSlice";

const ReduxStore = configureStore({
    reducer:{
        user: UserSlice.reducer,
        movies: MovieSlice.reducer,
        theatres: TheatreSlice.reducer,
        shows: ShowSlice.reducer,
    }
});

export default ReduxStore;