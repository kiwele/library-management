import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";
import axios from "axios";
// import "../../public/App.css"
import { useSelector, useDispatch } from "react-redux";
import { getAllBook, deleteBook } from "../redux/books";

const theme = createTheme();

// const DeleteBook =  (id) => {

//   const dispatch = useDispatch();
//   axios.post(`http://localhost:4000/delete_book/${id}`)
//   .then((response) => {
//     dispatch(deleteBook(response.data.book_id))
//    //  console.log(response.data);
//   })
// }

export default function ManageBookData() {
  const { books } = useSelector((state) => state.book);
  const dispatch = useDispatch();

  //  get all books
  useEffect(() => {
    dispatch(getAllBook());
  }, [dispatch]);
 
  // delete book by admin
  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {books.map((book, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image={`//localhost:4000/uploads/${book.picture}`}
                    alt={book.originalName}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {book.bookName}
                    </Typography>
                    <Typography>{book.Description}</Typography>
                  </CardContent>

                  <CardActions>
                    <Button size="small">
                      <ThumbUpIcon />
                      edit
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleDeleteBook(book.book_id)}
                    >
                      {/* <CommentIcon/> */}
                      delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
