import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const qs = require('qs');

import { saveSecure, getValueFor } from "../secure";

import { formRequest } from "./../../api";

export const signup = createAsyncThunk("user/signup",
    async (params, thunkAPI) => {
        try {

            const {data} = await formRequest('auth/register/', {
                method: "POST", data: qs.stringify(params)
            });
            
            if(data && data.access_token && data.expires_in){

                // thunkAPI.dispatch(setUser(params));

                saveSecure("credential", {
                    ...data, ...params,
                    expires_in: (new Date()).getTime() + (data.expires_in * 1000)
                });

                return { ...data, ...params, loginStatus: "loaded" };
            }

            return thunkAPI.rejectWithValue("No Data for SignUp");

        } catch (err) {

            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const signin = createAsyncThunk("user/signin",
    async (params, thunkAPI) => {
        try {

            const { data } = await formRequest('auth/login/', {
                method: "POST", data: qs.stringify(params)
            });
            
            if(data && data.access_token && data.expires_in){

                saveSecure("credential", {
                    ...data, ...params,
                    expires_in: (new Date()).getTime() + (data.expires_in * 1000)
                });

                return { ...data, ...params, loginStatus: "loaded" };
            }
            
            return thunkAPI.rejectWithValue(qs.stringify(data));

        } catch (err) {

            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const loadCredential = createAsyncThunk("user/loadCredential",
    async (params, thunkAPI) => {
        try {

            const result = (await getValueFor("credential"));

            if(result && result.access_token && result.expires_in){
                return {...result, loginStatus: "loaded"};
            }

            return {
                ...thunkAPI.getState(),
                loginStatus: "failed",
            };

        } catch (err) {

            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

const userSlice = createSlice({

    name: "user",
    initialState: {
        id: null,
        email: null,
        expires_in: 0,
        username: null,
        password: null,
        status: "idle",
        access_token: null,
        loginStatus: "loading",
        reasonForRejection: null
    },
    reducers: {
        setUser: (state, {payload})=> {
            return {
                ...state,
                ...payload
            }
        }
    },
    extraReducers: {

        /* sign up reducer */ 
        [signup.pending]: (state, action) => {
            state.status = "pending"
        },
        [signup.rejected]: (state, action) => {
            state.status = "rejected";
            state.reasonForRejection = qs.parse(action.payload);
        },
        [signup.fulfilled]: (state, { payload }) => {
            return {
                ...state, ...payload,
                status: "fulfilled"
            };
        },
        
        /* sign in reducer */ 
        [signin.pending]: (state, action) => {
            state.status = "pending"
        },
        [signin.rejected]: (state, action) => {
            state.status = "rejected";
            state.reasonForRejection = qs.parse(action.payload);
        },
        [signin.fulfilled]: (state, { payload }) => {
            return {
                ...state, ...payload,
                status: "fulfilled"
            };
        },

        /* loading reducer */ 
        [loadCredential.pending]: (state, action) => {
            state.status = "pending"
        },
        [loadCredential.rejected]: (state, action) => {
            state.status = "rejected";
            state.reasonForRejection = action.payload;
        },
        [loadCredential.fulfilled]: (state, { payload }) => {
            return {
                ...state, ...payload,
                status: "fulfilled"
            }
        },
    }
});

export const { setUser } = userSlice.actions;
export const getUser = (state) => state.user;
export const isLoggedIn = ({ user }) => user.loginStatus;

export default userSlice.reducer;