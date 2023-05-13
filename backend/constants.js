const regex =
  /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*[\w.,@?^=%&:\/~+#-])*\/?/;

const allowedCors = [
  "https://vera.anyasova.students.nomoredomains.monster",
  "http://vera.anyasova.students.nomoredomains.monster",
  "https://api.vera.anyasova.student.nomoredomains.monster",
  "http://api.vera.anyasova.student.nomoredomains.monster",
  "localhost:3000",
];

module.exports = { regex, allowedCors };
