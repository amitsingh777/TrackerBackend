const express = require("express");
const app = express();

const port = 8000;

const basicAuth = (req, res, next) => {
  const authorization = req.headers["authorization"];
  next();
};
app.use(express.json());
app.use(basicAuth);

app.post("/v1/login", (req, res) => {
  console.log(req.body);
  res.send("ok");
});

app.post("v1/signup", (req, res) => {
  res.send("signup");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
