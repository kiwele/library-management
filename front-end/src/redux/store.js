import { configureStore } from "@reduxjs/toolkit";
import bookReducer from './books.js'
import favoriteBookReducer from './favoriteBookSlice'


export default configureStore(
    {
        reducer:{
            favBook: favoriteBookReducer,
            book: bookReducer,

        }
    }
)