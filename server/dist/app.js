"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _url = require("url");

var _cors = _interopRequireDefault(require("cors"));

var _user = _interopRequireDefault(require("./routes/user.js"));

var _refresh = _interopRequireDefault(require("./routes/refresh.js"));

var _books = _interopRequireDefault(require("./routes/books.js"));

var _database = _interopRequireDefault(require("./database.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-underscore-dangle */

/* eslint-disable import/extensions */
const _filename = (0, _url.fileURLToPath)(import.meta.url); // eslint-disable-next-line no-unused-vars


const _dirname = _path.default.dirname(_filename);

_database.default.sequelize.sync({
  alter: true
}); // db.sequelize.sync({ force: true });


const app = (0, _express.default)(); // const whitelisted = ['http://localhost:3000'];

const corsOptions = {
  origin: 'http://localhost:3000',
  // origin: ['http://localhost:3000', 'http://localhost:4000'],
  optionsSuccessStatus: 200,
  credentials: true
};
app.use((0, _cors.default)(corsOptions)); // app.use(cors());

app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use((0, _cookieParser.default)());
app.use(_express.default.static('public'));
app.use(_express.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
})); // app.use('/', userRouter);

app.use('/', _refresh.default);
app.use('/', _user.default);
app.use('/', _books.default); // catch 404 and forward to error handler

app.use((req, res, next) => {
  next((0, _httpErrors.default)(404));
}); // error handler

app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.send(err.status);
});
var _default = app;
exports.default = _default;