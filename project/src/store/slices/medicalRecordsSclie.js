import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import medicalRecordAPI from "../../api/medicalRecord";

export const fetchMedicalRecords = createAsyncThunk(
  "appointmentsSlice/fetchMedicalRecords",
  async (patient_id) => {
    try {
      const result = await medicalRecordAPI.getAll(patient_id);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchMedicalRecord = createAsyncThunk(
  "medicalRecordsSlice/fetchMedicalRecord",
  async (record_id) => {
    try {
      const result = await medicalRecordAPI.getOne(record_id);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

// Reducer
const medicalRecordsSlice = createSlice({
  name: "medicalRecordsSlice",
  initialState: {
    medicalRecords: [],
    medicalRecordNeedUpdate: {},

    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    // Fetch Medical Records
    [fetchMedicalRecords.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchMedicalRecords.fulfilled]: (state, action) => {
      state.medicalRecords = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchMedicalRecords.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Medical Record
    [fetchMedicalRecord.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchMedicalRecord.fulfilled]: (state, action) => {
      state.medicalRecordNeedUpdate = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchMedicalRecord.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Selector
export const selectMedicalRecords = (state) =>
  state.medicalRecords.medicalRecords;

export const selectMedicalRecordNeedUpdate = (state) =>
  state.medicalRecords.medicalRecordNeedUpdate;

export const selectMedicalRecordIsLoading = (state) =>
  state.medicalRecords.isLoading;

export default medicalRecordsSlice.reducer;
