const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const fs = require("fs");
// const { uri } = require("./constants.js");
const uri =
  "mongodb+srv://amitbrajeshsingh:sfMSQVfhDFWAX0t7@maverick.oarc9.mongodb.net/?retryWrites=true&w=majority&appName=Maverick";
const client = new MongoClient(uri);
const port = 8000;
type test = {};

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
const basicAuth = (req, res, next) => {
  const authorization = req.headers["authorization"];
  next();
};
app.use(express.json());
app.use(basicAuth);

app.post("/v1/login", async (req, res) => {
  const database = client.db("sample_mflix");
  console.log("called1");
  const movies = database.collection("movies");
  console.log("called2");
  const query = { title: "The Room" };
  const options = {
    // Sort matched documents in descending order by rating
    sort: { "imdb.rating": -1 },
    // Include only the `title` and `imdb` fields in the returned document
    projection: { _id: 0, title: 1, imdb: 1 },
  };

  // const movie = await movies.;
  //   console.log("called4");
  //   console.log(movie);

  res.send("ok");
});

app.post("/v1/signup", (req, res) => {
  res.send("signup");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
