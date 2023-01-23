import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { axiosPrivate } from "../axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import bookService from "../services/book.service";

const baseURL = "http://localhost:4000/";
const token = localStorage.getItem('token');


// const axiosPrivate = useAxiosPrivate();
// add book in db
export const addBook =  createAsyncThunk("book/addBook", (addedBook) => {
  try {
    // const response = axios.post(baseURL + "add_book", addedBook)
    const response = bookService.serviceAddBook(addedBook)
    return response.data

  } catch (error) {
    console.log(error); 
  }
})

// get all books
export const getAllBook = createAsyncThunk("book/getAllBook", async () => {
      //  const axiosPrivate = useAxiosPrivate();
  try {
    // const response = await bookService.serviceGetBooks();
    const response = await axios.get(baseURL + "books")

    // {
    //   headers: {
    //     "token": localStorage.getItem("token")
    //   } 
    // }
    // )
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error);
  }
})

// edit book 
export const editBook = createAsyncThunk("book/editBook", async (editedBook) => {
  try {
    const {book_id, bookName, picture, Description } = editedBook;
    const response = await axios.put(baseURL + "edit_book" + book_id, { bookName, picture, Description }) 
    return response.data
    
  } catch (error) {
    console.log(error);
  }
})
// delete book
export const deleteBook = createAsyncThunk("book/deleteBook",async (id) => {

  try {
  const response = axios.delete(baseURL + "delete_book/" + id )
  return response.data
    
  } catch (error) {
    console.log(error);
  }

})

export const likeBook = createAsyncThunk("book/likeBook", (id) => {
  // const axiosPrivate = useAxiosPrivate();
  try {
    const response = axios.post(baseURL + "like/" + id,
    {
   
      
      headers: {
        // "Content-Type": "multipart/form-data",
        "token": localStorage.getItem("token")
      } 
    })
    return response.data
    
  } catch (error) {
    console.log(error);
    
  }
})

export const bookSlice = createSlice({
  

    name: 'book',
    initialState: {
        books: []
    },

    reducers: {
      
    },
    extraReducers: {
      [addBook.fulfilled]: (state, action) => {
       return {
        ...state,
        books: [action.payload, ...state.books]
      }
    },
    [getAllBook.fulfilled]: (state, action) => {
      return {
        ...state,
        books: action.payload
      }
    },

    [editBook.fulfilled]: (state, action) => {
     const updatedBook = state.books.map((editedBook) => 
     editedBook.book_id === action.payload.book_id ? action.payload: editedBook )
   return { 
    ...state,
    books: updatedBook
   }

    },

    [deleteBook.fulfilled]: (state, action) => {

      const currentBooks = state.books.filter(deletedBook =>  deletedBook.book_id !== action.payload.book_id
      );

      return {
        ...state,
        books: currentBooks,
      }
    },

    [likeBook.fulfilled]: (state, action) => {
      return {
        ...state,
        books: [...state],
      }
    }
}
})

export const  { getBooks }  = bookSlice.actions;
export default bookSlice.reducer;