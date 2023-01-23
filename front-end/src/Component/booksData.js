import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import Checkbox from '@mui/material/Checkbox';
import { useEffect } from 'react';
// import "./pages/App.css"
import { useSelector, useDispatch } from 'react-redux';
import { getAllBook, likeBook } from '../redux/books';


const theme = createTheme();

export default function BookData() {

   const { books } = useSelector((state) => state.book );
    const dispatch = useDispatch();
 
    useEffect(() => {
    dispatch(getAllBook())
    }, [dispatch]
    )

    const handleLike = (id) => {
    
      dispatch(likeBook(id))

    }

     console.log(books)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="100%" height="20%" className='BookContainer' >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              All Books
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            A book is a gift you can open again and again.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {books.map((book, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={`//localhost:4000/uploads/${book.picture}`} alt={book.originalName}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {book.bookName}
                    </Typography>
                    <Typography>
                      {book.Description}
                    </Typography>
                    
                  </CardContent>
                  <CardActions>
                  <Checkbox/>
                    <Button size="small"
                    onClick={() => handleLike(book.book_id)}
                    >
                        <ThumbUpIcon/>
                        like
                    </Button>
                    <Button size="small">
                        <CommentIcon/>
                        coment
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