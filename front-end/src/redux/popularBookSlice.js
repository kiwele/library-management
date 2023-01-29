import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:4000/";

// get all popular books
export const getAllpopularBook = createAsyncThunk(
  "book/getAllpopularBook",
  async () => {
    try {
      const response = await axios.get(baseURL + "popularBooks", {
        headers: {
          token: localStorage.getItem("token"),
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const popularBookSlice = createSlice({
  name: "popBook",
  initialState: {
    popBooks: [],
  },

  reducers: {},
  extraReducers: {
    [getAllpopularBook.fulfilled]: (state, action) => {
      return {
        ...state,
        popBooks: action.payload,
      };
    },
  },
});

  export const { getAllpopularBooks } = popularBookSlice.actions;
// export const  { getBooks }  = popularBookSlice.actions;
export default popularBookSlice.reducer;
