const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/index");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const handleErrors = require("./middlewares/handleErrors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const allowedCors = require("./constants");
// console.log(allowedCors);

require("dotenv").config();

const app = express();

// const cors = require("./middlewares/cors");

app.options(
  "*",
  cors({
    origin: allowedCors,
    credentials: true,
  })
);

app.use(
  cors({
    origin: allowedCors,
    credentials: true,
  })
);

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(cookieParser());

app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/mestodb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(err));

app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
