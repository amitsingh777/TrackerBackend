import app from "./expressUtils";
import AuthRouter from "./routes/Authentication";

const port = 8000;

app.use(AuthRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
