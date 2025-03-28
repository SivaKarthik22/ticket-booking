import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authorizeUser } from '../services/userServices';

export const getUser = createAsyncThunk('userSlice/getUser', async ()=>{
    const responseData = await authorizeUser();
    return responseData.data;
});

const UserSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: null,
        userLoading: false,
        userError: null,
    },
    reducers: {
        setUser: function(state, action){
            state.user = action.payload;
        }
    },
    extraReducers: function (builder) {
        builder.addCase(getUser.fulfilled, (state, action)=>{
            state.user = action.payload;
            state.userLoading = false;
            state.userError = null;
        });
        builder.addCase(getUser.pending, (state, action)=>{
            state.userLoading = true;
        });
        builder.addCase(getUser.rejected, (state, action)=>{
            state.user = null;
            state.userLoading = false;
            state.userError = action.error.message;
        });
    }
});

export default UserSlice;