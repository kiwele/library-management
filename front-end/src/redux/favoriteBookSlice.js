import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:4000/";

// get all favorite books
export const getAllFavoriteBook = createAsyncThunk(
  "book/getAllFavoriteBook",
  async () => {
    try {
      const response = await axios.get(baseURL + "favorites", {
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

export const favoriteBookSlice = createSlice({
  name: "favBook",
  initialState: {
    favBooks: [],
  },

  reducers: {},
  extraReducers: {
    [getAllFavoriteBook.fulfilled]: (state, action) => {
      return {
        ...state,
        favBooks: action.payload,
      };
    },
  },
});

  export const { getAllFavoriteBooks } = favoriteBookSlice.actions;
// export const  { getBooks }  = favoriteBookSlice.actions;
export default favoriteBookSlice.reducer;
