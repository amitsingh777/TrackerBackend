import { client } from "../mongoUtils";

export const checkExistingUser = async (name: string) => {
  const user = await client
    .db("Daily-Tracker")
    .collection("Users")
    .findOne({ name });

  return Boolean(user);
};
