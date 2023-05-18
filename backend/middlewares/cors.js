// const allowedCors = require("../constants");

// module.exports = (req, res, next) => {
//   const { origin } = req.headers;

//   if (!allowedCors.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", "*");
//   }
//   res.header("Access-Control-Allow-Origin", origin);
//   res.header("Access-Control-Allow-Credentials", "true");

//   const { method } = req;

//   const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

//   const requestHeaders = req.headers["access-control-request-headers"];

//   if (method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
//     res.header("Access-Control-Allow-Headers", requestHeaders);
//     return res.end();
//   }
//   // res.header("Access-Control-Allow-Origin", "*");
//   return next();
// };

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", allowedCors);
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
//   res.header("Access-Control-Allow-Credentials", "true");

//   next();
// });

// const handleCors = (req, res, next) => {
//   const { origin } = req.headers;

//   if (allowedCors.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//     res.header("Access-Control-Allow-Credentials", "true");
//   }

//   res.header("Access-Control-Allow-Origin", "*");

//   next();
// };

// const handleOption = (req, res, next) => {
//   const { method } = req;

//   const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

//   const requestHeaders = req.headers["access-control-request-headers"];

//   if (method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
//     res.header("Access-Control-Allow-Headers", requestHeaders);
//     return res.end();
//   }

//   return next();
// };

// module.exports = { handleCors, handleOption };
