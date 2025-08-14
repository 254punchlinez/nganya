// src/store/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "http://localhost:5000";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data?.message || "Registration failed");
      }
      return data.user; // safe user data from server
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data?.message || "Login failed");
      }
      return data.user;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // You can choose to auto-login here; we won't, since you redirect to /login
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });

    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
