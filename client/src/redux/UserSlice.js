import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: null,
    },
    reducers: {
        setUser: function(state, action){
            state.user = action.payload;
        }
    }
});

export default UserSlice;