import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, getCookie, removeCookie } from "../coockie";
import { request, formRequest } from "../../requests";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (params, thunkAPI) => {
    try {

      // const { data } = await request("auth/local/register", {
      //   method: "POST",
      //   data: params
      // });

      const { data } = await formRequest("users", {
        method: "POST",
        data: params
      });

      if (data) {
        return { ...data, ...params, loginStatus: "loaded" };
      }

      return thunkAPI.rejectWithValue("No Data for Create User");

    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (params, thunkAPI) => {
    try {

      const { data } = await formRequest(`users/${params.id}`, {
        method: "PUT",
        data: params
      });

      if (data) {
        return { ...data, ...params };
      }

      return thunkAPI.rejectWithValue("No Data for Updat eUser");

    } catch (err) {

      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const signin = createAsyncThunk(
  "user/signin",
  async (params, thunkAPI) => {
    try {
      const { username, password } = params;
      const { data } = await request("auth/local", {
        method: "POST",
        data: { identifier: username, password },
      });

      if (data && data.user && data.user.id) {
        const datas = { jwt: data.jwt, ...data.user };

        setCookie("credential", {
          ...datas,
          ...params,
        });

        return { ...datas, ...params, loginStatus: "loaded" };
      }

      return thunkAPI.rejectWithValue(JSON.stringify(data));
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const signout = createAsyncThunk(
  "user/signout",
  async (params, thunkAPI) => {
    try {
      const result = await removeCookie("credential");

      if (result) {
        return {
          ...thunkAPI.getState().user,
          loginStatus: "failed",
        };
      }

      return thunkAPI.getState().user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const resetPass = createAsyncThunk(
  "user/resetPass",
  async (params, thunkAPI) => {
    try {

      const { password, confirmPass, code } = params;
      const { data } = await request("auth/local", {
        method: "POST",
        data: {
          code,
          password,
          passwordConfirmation: confirmPass,
        },
      });

      return thunkAPI.rejectWithValue(JSON.stringify(data));

    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const loadCredential = createAsyncThunk(
  "user/loadCredential",
  async (params, thunkAPI) => {
    try {
      const result = await getCookie("credential");

      if (result && result.jwt) {
        return { ...result, loginStatus: "loaded" };
      }

      return {
        ...thunkAPI.getState().user,
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
    jwt: null,
    role: null,
    email: null,
    username: null,
    password: null,
    status: "idle",
    provider: null,
    confirmed: false,
    created_at: null,
    updated_at: null,
    loginStatus: "loading",
    reasonForRejection: null,
  },
  reducers: {
    setUser: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
  extraReducers: {
    /* sign up reducer */
    [createUser.pending]: (state, action) => {
      state.status = "pending";
    },
    [createUser.rejected]: (state, action) => {
      state.status = "rejected";
      state.reasonForRejection = JSON.stringify(action.payload);
    },
    [createUser.fulfilled]: (state, { payload }) => {
      // return {
      //   ...state,
      //   ...payload,
      //   status: "fulfilled",
      // };
    },

    /* sign in reducer */
    [signin.pending]: (state, action) => {
      state.status = "pending";
    },
    [signin.rejected]: (state, action) => {
      state.status = "rejected";
      state.reasonForRejection = JSON.stringify(action.payload);
    },
    [signin.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        ...payload,
        status: "fulfilled",
      };
    },
    
    /* sign out reducer */
    [signout.pending]: (state, action) => {
      state.status = "pending";
    },
    [signout.rejected]: (state, action) => {
      state.status = "rejected";
      state.reasonForRejection = JSON.stringify(action.payload);
    },
    [signout.fulfilled]: (state, { payload }) => ({
      ...state,
      ...payload,
      status: "fulfilled",
    }),

    /* loading reducer */
    [loadCredential.pending]: (state, action) => {
      state.status = "pending";
    },
    [loadCredential.rejected]: (state, action) => {
      state.status = "rejected";
      state.reasonForRejection = action.payload;
    },
    [loadCredential.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        ...payload,
        status: "fulfilled",
      };
    },
  },
});

export const { setUser } = userSlice.actions;
export const getUser = (state) => state.user;
export const isLoggedIn = ({ user }) => user.loginStatus;

export default userSlice.reducer;
