declare namespace Express {
  export interface Request {
    token?: string
  }
}

declare module 'simple-oauth2'
