const regex =
  /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*[\w.,@?^=%&:\/~+#-])*\/?/;

const allowedCors = [
  "https://vera.anyasova.students.nomoredomains.monster",
  "http://vera.anyasova.students.nomoredomains.monster",
  "https://localhost:3000",
  "http://localhost:3000",
  "https://localhost:3001",
  "http://localhost:3001",
  "https://51.250.88.144",
  "http://51.250.88.144",
];

module.exports = { regex, allowedCors };
