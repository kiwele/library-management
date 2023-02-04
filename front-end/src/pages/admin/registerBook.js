import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TextField } from "@material-ui/core";
// import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { addBook } from "../../redux/books";


const mdTheme = createTheme();

function RegisterBookContent() {
  const dispatch = useDispatch();

  const [data, setData] = useState({ bookName: "", Description: "" });
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("bookName", data.bookName);
    formData.append("Description", data.Description);
    formData.append("file", file);

    dispatch(addBook(formData));
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid
          item
          xs={12}
          sm={8}
          md={12}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5">
              MANAGE BOOK
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="bookName"
                label="book name"
                name="bookName"
                autoComplete="text"
                autoFocus
                value={data.bookName}
                onChange={(e) => setData({ ...data, bookName: e.target.value })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="Description"
                label="Description"
                name="Description"
                autoComplete="text"
                autoFocus
                value={data.Description}
                onChange={(e) =>
                  setData({ ...data, Description: e.target.value })
                }
              />

              <Input type="file" onChange={handleFileChange} />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Book
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default function RegisterBook() {
  return <RegisterBookContent />;
}
