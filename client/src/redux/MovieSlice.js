import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllMovies } from "../services/movieServices";

export const getAllMovies = createAsyncThunk('movieSlice/getAllMovies', ()=>{
    return new Promise((resolve, reject)=>{
        fetchAllMovies()
        .then(responseData => {resolve(responseData.data)} )
        .catch(reject);
    });
});

const MovieSlice = createSlice({
    name: 'movieSlice',
    initialState: {
        movies: [],
        isLoading: false,
        errorMsg: null,
    },
    reducers: {
        setMovies: function (state, action) {
            state.movies = action.payload;
        }
    },
    extraReducers: function (builder) {
        builder.addCase(getAllMovies.pending, (state)=>{
            state.isLoading = true;
        });
        builder.addCase(getAllMovies.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.movies = action.payload;
            state.errorMsg = null;
        });
        builder.addCase(getAllMovies.rejected, (state, action)=>{
            state.isLoading = false;
            state.errorMsg = action.error.message;
            state.movies = [];
        });
    }
});

export default MovieSlice;