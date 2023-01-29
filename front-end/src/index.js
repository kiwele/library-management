import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from "./pages/Home";
import { Route, Routes, Link, BrowserRouter } from "react-router-dom";
import Register from './pages/register';
import { Provider } from 'react-redux';
import store from './redux/store';
import Dashboard from './pages/admin/books';
import RegisterBook from './pages/admin/registerBook';
import Popular from './pages/user/popular';
import Favourite from './pages/user/favourite';
import UserDashboard from './pages/user/userDashboard';
import AddBook from './pages/admin/addBook';
import ManageBooks from './pages/admin/manageBooks';
import AdminPopular from './pages/admin/adminPopular';
import AdminFavourite from './pages/admin/adminFavourite';
import UserDataTable from './pages/admin/userList';
import ManageUsers from './pages/admin/manageUsers';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <div>     
   
   <Provider store={store}>

      <BrowserRouter>

         <Routes>
           <Route path="/home" element ={<Home />}/>
           <Route path="/register" element ={<Register />}/>
           <Route path="/registerBook" element ={<AddBook />}/>
           <Route path="/books" element ={<Dashboard />}/>
           <Route path="/popular_books" element ={<Popular />}/>
           <Route path="/admin_popular_books" element ={<AdminPopular />}/>
           <Route path="/favourite_books" element ={<Favourite />}/>
           <Route path="/admin_favourite_books" element ={<AdminFavourite />}/>
           <Route path="/user_dashboard" element ={<UserDashboard />}/>
           <Route path="/manage_book" element ={<ManageBooks />}/>
           <Route path="/users" element ={<ManageUsers />}/>
           <Route  path='/*' element = {<App />}/>
         </Routes>
     </BrowserRouter> 
     </Provider>

   
    </div>

   
   
);
