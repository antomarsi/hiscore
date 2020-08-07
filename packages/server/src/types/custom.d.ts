import User from "./../database/entity/User";
declare global {
  namespace Express {
    interface Request {
      token?: string
      user?: User
    }
  }
}

declare module 'simple-oauth2'
