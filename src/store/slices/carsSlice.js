import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import carsData from "@/data/cars" // Import your local car data

// Async thunk to simulate fetching cars
export const fetchCars = createAsyncThunk("cars/fetchCars", async (_, { rejectWithValue }) => {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return carsData
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false
        state.cars = action.payload
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default carsSlice.reducer
