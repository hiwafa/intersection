import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, getCookie, removeCookie } from "../coockie";
import { request } from "../../requests";

export const signup = createAsyncThunk(
  "user/signup",
  async (params, thunkAPI) => {
    try {

      const { data } = await request("auth/local/register", {
        method: "POST",
        data: params
      });

      if (data) {
        setCookie("credential", {
          ...data,
          ...params,
        });

        return { ...data, ...params, loginStatus: "loaded" };
      }

      return thunkAPI.rejectWithValue("No Data for SignUp");
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

      console.log("resetPass: ", data);

      return null;

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
    [signup.pending]: (state, action) => {
      state.status = "pending";
    },
    [signup.rejected]: (state, action) => {
      state.status = "rejected";
      state.reasonForRejection = JSON.stringify(action.payload);
    },
    [signup.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        ...payload,
        status: "fulfilled",
      };
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
