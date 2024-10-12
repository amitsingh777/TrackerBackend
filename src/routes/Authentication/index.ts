import express from 'express';

import {client, COLLECTIONS, DATABASES} from '../../mongoUtils';
import {checkExistingUser, jwtTokenCreation} from '../../utilityFunctions';
import {JWT_SECRET} from '../../secret';
const AuthRouter = express.Router();

AuthRouter.post('/v1/login', async (req, res) => {
  const {name, password} = req.body;

  const foundUser = await client
    .db(DATABASES.primaryDB)
    .collection(COLLECTIONS.USERS)
    .findOne({name, password});

  foundUser
    ? res.send('You are Authenticated successfully')
    : res.status(401).send('Unauthorized');
});

AuthRouter.post('/v1/signup', async (req, res) => {
  const {name, password, gmail} = req.body;
  if (!(name && password && gmail)) {
    res.status(400).send('Please send full user Details');
    return;
  }
  const isExistingUser = await checkExistingUser(gmail);
  if (isExistingUser) {
    res.status(409).send('Email already in use!');
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

      jwtTokenCreation({name, password, gmail}, (err, token) => {
        if (err) {
          res.status(500).send('Please retry after sometime');
          return;
        }
        res.status(200).send({token});
        return;
      });
    } catch (e) {
      res
        .status(500)
        .send('Problem in creating account, please try after sometime.');
    }
  }
});

export default AuthRouter;
