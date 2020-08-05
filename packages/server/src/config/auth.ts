export const GITHUB = {
  clientId: process.env.PASSPORT_GITHUB_CLIENT_ID,
  clientSecret: process.env.PASSPORT_GITHUB_CLIENT_SECRET,
  callbackURL: process.env.APP_URL + '/api/v1/auth/google/callback'
}

export const GOOGLE = {
  clientId: process.env.PASSPORT_GOOGLE_CLIENT_ID,
  clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.APP_URL + '/api/v1/auth/github/callback'
}

export default {
  secret: process.env.APP_SECRET || '',
  expiresIn: '1h'
}
