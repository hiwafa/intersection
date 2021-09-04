import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from "./actions/UserSlice";
import { myAPI } from "./query";

const allReducers = {
    user: userReducer
};

const store = configureStore({
    reducer: allReducers,
    middleware: gdm => gdm().concat(myAPI.middleware)
});


export default store;

setupListeners(store.dispatch);