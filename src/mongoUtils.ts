import { MongoClient } from "mongodb";
import { uri } from "./secret";
export const client = new MongoClient(uri);

export const DATABASES = {
  primaryDB: "Daily-Tracker",
};

export const COLLECTIONS = {
  USERS: "Users",
};
