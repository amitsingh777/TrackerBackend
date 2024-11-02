import app from './expressUtils';
import AuthRouter from './routes/Authentication';
import {jwtTokenVerification} from './utilityFunctions';
import morgan from 'morgan';

const port = 8000;
app.use(morgan('combined'));

app.use(AuthRouter);

app.use(jwtTokenVerification);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
