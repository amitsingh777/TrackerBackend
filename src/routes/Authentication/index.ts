import express from "express";
import jwt from "jsonwebtoken";
import { client, COLLECTIONS, DATABASES } from "../../mongoUtils";
import { checkExistingUser } from "../../utilityFunctions";
import { JWT_SECRET } from "../../secret";
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
  const { name, password, gmail } = req.body;
  if (!(name && password && gmail)) {
    res.status(400).send("Please send full user Details");
    return;
  }
  const isExistingUser = await checkExistingUser(name);
  if (isExistingUser) {
    res.status(409).send("Email already in use!");
  } else {
    try {
      await client
        .db(DATABASES.primaryDB)
        .collection(COLLECTIONS.USERS)
        .insertOne({
          name: name,
          password: password,
          gmail: gmail,
        });
      const token = jwt.sign(
        { name, password, gmail },
        JWT_SECRET.key,
        JWT_SECRET.config
      );
      res.status(200).send({ token: token });
    } catch (e) {
      res
        .status(500)
        .send("Problem in creating account, please try after sometime.");
    }
  }
});

export default AuthRouter;
