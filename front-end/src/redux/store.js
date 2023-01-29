import { configureStore } from "@reduxjs/toolkit";
import bookReducer from './books.js'
import favoriteBookReducer from './favoriteBookSlice'
import popularBookReducer from './popularBookSlice'
import userReducer from './userSlice'


export default configureStore(
    {
        reducer:{
            favBook: favoriteBookReducer,
            book: bookReducer,
            popBook: popularBookReducer,
            user: userReducer,

        }
    }
)