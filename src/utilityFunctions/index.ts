import jwt, {SignCallback} from 'jsonwebtoken';
import {client, COLLECTIONS, DATABASES} from '../mongoUtils';
import {JWT_SECRET} from '../secret';
import {NextFunction, Request, Response} from 'express';
import {decodedJwtUser} from '../types/express';

export type jwtSignPayload = {name: string; password: string; mail: string};

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

export const tokenCreationAndRes = (payload: jwtSignPayload, res: Response) => {
  jwtTokenCreation(payload, (err, token) => {
    if (err) {
      res.status(500).send('Please retry after sometime');
      return;
    }
    res.status(200).send({token});
    return;
  });
};

export const jwtTokenVerification = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split('Bearer')?.[1]?.trim();

  if (token) {
    jwt.verify(token, JWT_SECRET.key, (err, decoded) => {
      if (err) {
        res.status(401).sendStatus(401);
        return;
      } else {
        req.user = decoded as decodedJwtUser;
        next();
      }
    });
  } else {
    res.status(401).sendStatus(401);
    return;
  }
};
