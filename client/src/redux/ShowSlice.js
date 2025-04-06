import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllShowsOfTheatre } from "../services/showServices";

export const getAllShowsOfTheatre = createAsyncThunk('showSlice/getAllShowsOfTheatre', (theatreId)=>{
    return new Promise((resolve, reject)=>{
        fetchAllShowsOfTheatre(theatreId)
        .then(responseData => {resolve(responseData.data)} )
        .catch(reject);
    });
});

const ShowSlice = createSlice({
    name: 'showSlice',
    initialState: {
        shows: [],
        showsAreLoading: false,
        showsErrorMsg: null,
    },
    reducers: {
        setShows: function (state, action) {
            state.shows = action.payload;
        }
    },
    extraReducers: function (builder) {
        builder.addCase(getAllShowsOfTheatre.pending, (state)=>{
            state.showsAreLoading = true;
        });
        builder.addCase(getAllShowsOfTheatre.fulfilled, (state, action)=>{
            state.showsAreLoading = false;
            state.shows = action.payload;
            state.showsErrorMsg = null;
        });
        builder.addCase(getAllShowsOfTheatre.rejected, (state, action)=>{
            state.showsAreLoading = false;
            state.showsErrorMsg = action.error.message;
            state.shows = [];
        });
    }
});

export default ShowSlice;