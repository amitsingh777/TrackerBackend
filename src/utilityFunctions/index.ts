import jwt, {SignCallback} from 'jsonwebtoken';
import {client} from '../mongoUtils';
import {JWT_SECRET} from '../secret';

type jwtSignPayload = {name: string; password: string; mail: string};

export const checkExistingUser = async (mail: string) => {
  const user = await client
    .db('Daily-Tracker')
    .collection('Users')
    .findOne({mail});

  return Boolean(user);
};

export const jwtTokenCreation = (
  payload: jwtSignPayload,
  callback: SignCallback,
) => {
  return jwt.sign(payload, JWT_SECRET.key, JWT_SECRET.config, callback);
};

// export const jwtTokenVerification = (token) => {
//   return jwt.verify()
// };
