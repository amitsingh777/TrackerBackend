import express from "express";
import { client, COLLECTIONS, DATABASES } from "../../mongoutils";
import { checkExistingUser } from "../../utilityFunctions";
const AuthRouter = express.Router();

AuthRouter.post("/v1/login", async (req, res) => {
  const { name, password } = req.body;

  const foundUser = await client
    .db(DATABASES.primaryDB)
    .collection(COLLECTIONS.USERS)
    .findOne({ name, password });

  foundUser
    ? res.send("You are Authenticated successfully")
    : res.status(401).send("Unauthorized");
});

AuthRouter.post("/v1/signup", async (req, res) => {
  const body = req.body;
  const isExistingUser = await checkExistingUser(body.name);
  if (isExistingUser) {
    res.status(409).send("Email already in use!");
  } else {
    try {
      await client
        .db(DATABASES.primaryDB)
        .collection(COLLECTIONS.USERS)
        .insertOne({
          name: body.name,
          password: body.password,
          gmail: body.gmail,
        });

      res.status(200).send("User Created Successfully");
    } catch (e) {
      res
        .status(500)
        .send("Problem in creating account, please try after sometime.");
    }
  }
});

export default AuthRouter;
