import {createAsyncThunk} from "@reduxjs/toolkit";
import {ServiceHours} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchServiceHoursForExpert = createAsyncThunk<ServiceHours[], string>(
  'serviceHours/fetchServiceHoursForExpert',
  async (expertId ) => {
      const response = await axiosApi.get(`/service-hours/expert/${expertId}`);
      return response.data
  }
);