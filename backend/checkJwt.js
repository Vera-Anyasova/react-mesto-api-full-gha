const jwt = require("jsonwebtoken");
const YOUR_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDY2NDBiNjVmNDIyYzY0YzBlOTQwODYiLCJpYXQiOjE2ODQ0MjI4ODMsImV4cCI6MTY4NTAyNzY4M30.2r6kyrIYZrQWmF-JDqi72b_12m-QuRAddBdCKTrHzCU";
const SECRET_KEY_DEV = "jwt-secret";
try {
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log(
    "\x1b[31m%s\x1b[0m",
    `Надо исправить. В продакшне используется тот же секретный ключ, что и в режиме разработки.`
  );
} catch (err) {
  if (err.name === "JsonWebTokenError" && err.message === "invalid signature") {
    console.log(
      "\x1b[32m%s\x1b[0m",
      "Всё в порядке. Секретные ключи отличаются"
    );
  } else {
    console.log("\x1b[33m%s\x1b[0m", "Что-то не так", err);
  }
}
