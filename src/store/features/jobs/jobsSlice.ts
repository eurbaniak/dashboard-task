import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { JobStateT } from "../../../utils/types";
import { handleFetchJobs } from "./utils";

const initialState: JobStateT = {
  data: [],
  status: "idle",
};

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  try {
    const data = await handleFetchJobs();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(fetchJobs.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default jobsSlice.reducer;
