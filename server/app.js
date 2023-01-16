/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import cors from 'cors';
import userRouter from './routes/user.js';
import refresh from './routes/refresh.js';
import bookRouter from './routes/books.js';

import db from './database.js';

const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-unused-vars
const __dirname = path.dirname(__filename);

db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });

const app = express();

// const whitelisted = ['http://localhost:3000'];
const corsOptions = {
  origin: 'http://localhost:3000',
  // origin: ['http://localhost:3000', 'http://localhost:4000'],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

// app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/', userRouter);

app.use('/', refresh);
app.use('/', userRouter);
app.use('/', bookRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

export default app;
