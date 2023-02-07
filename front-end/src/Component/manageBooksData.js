/* eslint-disable no-unused-expressions */
import * as React from "react";
import Button from "@mui/material/Button";
import { Alert } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBook, deleteBook } from "../redux/books";

const theme = createTheme();

export default function ManageBookData() {
  const books = useSelector((state) => state.book);
  console.log(books);
  const dispatch = useDispatch();

  //  get all books
  useEffect(() => {
    
    const interveal = setInterval(() => {
      dispatch(getAllBook());

    }, 1000)

    return interveal
  }, [dispatch]);

  // delete book by admin
  const handleDeleteBook = async (id) => {
    dispatch(deleteBook(id));
    (await books.deleteBookStatus) === "success" ? (
      <Alert severity="success"> book deleted </Alert>
    ) : null;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main>
        <Container sx={{ py: 8 }} maxWidth="md">

        {books.deleteBookStatus === "success" ? (
                      <Alert severity="success"> book deleted sucessifully </Alert>
                    ) : null}

          {/* End hero unit */}
          <Grid container spacing={4}>
            {books.books.map((book, index) => (
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
