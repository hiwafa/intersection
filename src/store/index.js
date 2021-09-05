import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from "./actions/UserSlice";
import { intersectionAPI } from "./query";

const allReducers = {
    user: userReducer,
    [intersectionAPI.reducerPath]: intersectionAPI.reducer
};

const store = configureStore({
    reducer: allReducers,
    middleware: gdm => gdm().concat(intersectionAPI.middleware)
});


export default store;

setupListeners(store.dispatch);