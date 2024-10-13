export type decodedJwtUser = {
  name: string;
  password: string;
  mail: string;
  iat: number;
  exp: number;
};

declare global {
  namespace Express {
    interface Request {
      user?: decodedJwtUser;
    }
  }
}
