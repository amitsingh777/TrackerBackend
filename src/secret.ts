import {SignOptions} from 'jsonwebtoken';

const CLUSTER_PASSWORD = 'sfMSQVfhDFWAX0t7';
export const uri = `mongodb+srv://amitbrajeshsingh:${CLUSTER_PASSWORD}@maverick.oarc9.mongodb.net/?retryWrites=true&w=majority&appName=Maverick`;
export const JWT_SECRET = {
  key: '4chxDh9RYRpQi/juTURsYenMQl7BdmcdoM8AWPA2kUI=',
  config: {
    algorithm: 'HS512',
    encoding: 'utf-8',
    expiresIn: 60 * 60,
  } as SignOptions,
};
