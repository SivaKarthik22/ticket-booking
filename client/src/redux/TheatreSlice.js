import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllTheatresOfOwner, fetchAllTheatres } from "../services/theatreServices";

export const getAllTheatresOfOwner = createAsyncThunk('theatreSlice/getAllTheatresOfOwner', (ownerId)=>{
    return new Promise((resolve, reject)=>{
        fetchAllTheatresOfOwner(ownerId)
        .then(responseData => {resolve(responseData.data)} )
        .catch(reject);
    });
});

export const getAllTheatres = createAsyncThunk('theatreSlice/getAllTheatres', ()=>{
    return new Promise((resolve, reject)=>{
        fetchAllTheatres()
        .then(responseData => {resolve(responseData.data)} )
        .catch(reject);
    });
});

const TheatreSlice = createSlice({
    name: 'theatreSlice',
    initialState: {
        theatres: [],
        theatresAreLoading: false,
        theatresErrorMsg: null,
    },
    reducers: {
        setTheatres: function (state, action) {
            state.theatres = action.payload;
        }
    },
    extraReducers: function (builder) {
        builder.addCase(getAllTheatresOfOwner.pending, (state)=>{
            state.theatresAreLoading = true;
        });
        builder.addCase(getAllTheatresOfOwner.fulfilled, (state, action)=>{
            state.theatresAreLoading = false;
            state.theatres = action.payload;
            state.theatresErrorMsg = null;
        });
        builder.addCase(getAllTheatresOfOwner.rejected, (state, action)=>{
            state.theatresAreLoading = false;
            state.theatresErrorMsg = action.error.message;
            state.theatres = [];
        });
        builder.addCase(getAllTheatres.pending, (state)=>{
            state.theatresAreLoading = true;
        });
        builder.addCase(getAllTheatres.fulfilled, (state, action)=>{
            state.theatresAreLoading = false;
            state.theatres = action.payload;
            state.theatresErrorMsg = null;
        });
        builder.addCase(getAllTheatres.rejected, (state, action)=>{
            state.theatresAreLoading = false;
            state.theatresErrorMsg = action.error.message;
            state.theatres = [];
        });
    }
});

export default TheatreSlice;