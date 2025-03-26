import { createSlice } from "@reduxjs/toolkit";

const MovieSlice = createSlice({
    name: 'movieSlice',
    initialState: {
        movies: [],
    },
    reducers: {
        setMovies: function (state, action) {
            state.movies = action.payload;
        }
    }
});

export default MovieSlice;