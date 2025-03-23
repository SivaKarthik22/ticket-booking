import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./userSlice";

const ReduxStore = configureStore({
    reducer:{
        user: UserSlice.reducer,
    }
});

export default ReduxStore;