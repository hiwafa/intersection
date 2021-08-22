import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { saveSecure, getValueFor } from "../localStore";

import { formRequest } from "../../requests";

export const signup = createAsyncThunk("user/signup",
    async (params, thunkAPI) => {
        try {

            const {data} = await formRequest('auth/register/', {
                method: "POST", data: params
            });
            
            if(data) {

                saveSecure("credential", {
                    ...data, ...params
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
                method: "POST", data: params
            });
            
            if(data && data["id"]){

                saveSecure("credential", {
                    ...data, ...params
                });

                return { ...data, ...params, loginStatus: "loaded" };
            }
            
            return thunkAPI.rejectWithValue(JSON.stringify(data));

        } catch (err) {

            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const loadCredential = createAsyncThunk("user/loadCredential",
    async (params, thunkAPI) => {
        try {

            const result = (await getValueFor("credential"));

            if(result){
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
        username: null,
        password: null,
        status: "idle",
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
            state.reasonForRejection = JSON.stringify(action.payload);
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
            state.reasonForRejection = JSON.stringify(action.payload);
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