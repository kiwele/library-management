import axios from "../axios";
import authHeader from "../auth/headers";


const baseURL = "http://localhost:4000/";

const serviceGetBooks = () => {
    return axios.get(baseURL + "books", { headers: authHeader() });
  };
  
  const serviceAddBook = (bookData) => {
    return axios.get(baseURL + "useradd_book", { headers: authHeader() });
  };
  
//   const getModeratorBoard = () => {
//     return axios.get(API_URL + "mod", { headers: authHeader() });
//   };
  
//   const getAdminBoard = () => {
//     return axios.get(API_URL + "admin", { headers: authHeader() });
//   };
  
  const bookService = {
    serviceGetBooks,
    serviceAddBook,
  };
  
  export default bookService