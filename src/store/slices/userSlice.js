import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Simulate user data storage (in a real app, this would be localStorage or a cookie)
let currentUser = null

// Async thunk for user login
export const login = createAsyncThunk("user/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

    if (email === "test@example.com" && password === "password123") {
      currentUser = {
        id: "user-1",
        username: "TestUser",
        email: "test@example.com",
        memberSince: new Date().toISOString(),
      }
      return currentUser
    } else {
      return rejectWithValue("Invalid email or password.")
    }
  } catch (error) {
    return rejectWithValue(error.message || "Login failed.")
  }
})

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "user/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

      if (email === "existing@example.com") {
        return rejectWithValue("Email already registered.")
      }

      const newUser = {
        id: `user-${Date.now()}`,
        username,
        email,
        memberSince: new Date().toISOString(),
      }

      currentUser = newUser // Store mock user
      return newUser
    } catch (error) {
      return rejectWithValue(error.message || "Registration failed.")
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: currentUser,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null
      currentUser = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
