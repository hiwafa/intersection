import { configureStore } from "@reduxjs/toolkit";


import userReducer from "./actions/UserSlice";

const allReducers = {
    user: userReducer
};

export default configureStore({
    reducer: allReducers
});