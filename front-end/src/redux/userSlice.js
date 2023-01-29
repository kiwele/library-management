import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:4000/";

// get all popular books
export const getUser = createAsyncThunk(
  "user/getUser",
  async () => {
    try {
      const response = await axios.get(baseURL + "users", {
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

// delete user
export const deleteUser = createAsyncThunk("book/deleteUser",async (id) => {

    try {
    const response = axios.delete(baseURL + "delete_user/" + id,
    
    { 
      headers: {
     "token": localStorage.getItem("token")
   },
   withCredentials: true }
   )
    return response.data
      
    } catch (error) {
      console.log(error);
    }
  
  })

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },

  reducers: {},
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
        // console.log(action.payload);
      return {
        ...state,
        users: action.payload,
      };
    },

    [deleteUser.fulfilled]: (state, action) => {

        const currentUsers = state.users.filter(deletedUser =>  deletedUser.userId !== action.payload.userId
        );
  
        return {
          ...state,
          users: currentUsers,
        }
      },
  },
});

export const { getUsers } = userSlice.actions;
export default userSlice.reducer;
