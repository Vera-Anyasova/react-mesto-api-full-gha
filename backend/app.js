const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index");
const { errors } = require("celebrate");
const handleErrors = require("./middlewares/handleErrors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const cors = require("./middlewares/cors");

const app = express();

app.use(cors());

const { PORT = 3000 } = process.env;

app.use(express.json());

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
