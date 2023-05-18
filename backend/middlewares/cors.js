const allowedCors = require("../controllers");

module.exports = (req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    console.log(allowedCors);

    const { method } = req;

    const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

    const requestHeaders = req.headers["access-control-request-headers"];

    if (method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
      res.header("Access-Control-Allow-Headers", requestHeaders);
      return res.end();
    }
  }
  res.header("Access-Control-Allow-Origin", "*");

  return next();
};

// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://localhost:3000",
//     "https://vera.anyasova.students.nomoredomains.monster",
//     "http://vera.anyasova.students.nomoredomains.monster",
//     "https://api.vera.anyasova.student.nomoredomains.monster",
//     "http://api.vera.anyasova.student.nomoredomains.monster"
//   );
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
//   res.header("Access-Control-Allow-Credentials", "true");

//   next();
// });
