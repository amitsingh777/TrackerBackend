import express, {Response} from 'express';

import {client, COLLECTIONS, DATABASES} from '../../mongoUtils';
import {checkExistingUser, tokenCreationAndRes} from '../../utilityFunctions';

const AuthRouter = express.Router();

AuthRouter.post('/v1/login', async (req, res) => {
  const {name, password} = req.body;

  const foundUser = await client
    .db(DATABASES.primaryDB)
    .collection(COLLECTIONS.USERS)
    .findOne({name, password});
  if (foundUser) {
    tokenCreationAndRes({name, password, mail: foundUser.mail}, res);
  } else {
    res.status(401).send('Unauthorized');
    return;
  }
});

AuthRouter.post('/v1/signup', async (req, res) => {
  const {name, password, mail} = req.body;
  if (!(name || password || mail)) {
    res.status(400).send('Please send full user Details');
    return;
  }
  const isExistingUser = await checkExistingUser(mail);
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
          mail: mail,
        });

      tokenCreationAndRes({name, password, mail}, res);
    } catch (e) {
      res
        .status(500)
        .send('Problem in creating account, please try after sometime.');
    }
  }
});

export default AuthRouter;
