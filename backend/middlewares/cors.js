app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://localhost:3000",
    "https://vera.anyasova.students.nomoredomains.monster",
    "http://vera.anyasova.students.nomoredomains.monster",
    "https://api.vera.anyasova.student.nomoredomains.monster",
    "http://api.vera.anyasova.student.nomoredomains.monster"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Credentials", "true");

  next();
});
