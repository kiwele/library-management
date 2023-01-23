import { configureStore } from "@reduxjs/toolkit";
import bookReducer from './books.js'


export default configureStore(
    {
        reducer:{
            book: bookReducer,
        }
    }
)