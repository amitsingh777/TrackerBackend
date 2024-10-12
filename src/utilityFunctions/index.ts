import jwt, { SignCallback } from "jsonwebtoken";
import { client } from "../mongoUtils";
import { JWT_SECRET } from "../secret";

type jwtSignPayload = string | Buffer | object;

export const checkExistingUser = async (gmail: string) => {
  const user = await client
    .db("Daily-Tracker")
    .collection("Users")
    .findOne({ gmail });

  return Boolean(user);
};

export const jwtTokenCreation = (
  payload: jwtSignPayload,
  callback: SignCallback
) => {
  return jwt.sign(payload, JWT_SECRET.key, JWT_SECRET.config, callback);
};

export const jwtTokenVerification = () => {
  return;
};
