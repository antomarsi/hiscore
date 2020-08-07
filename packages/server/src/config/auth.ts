const url = process.env.API_URL || 'http://localhost:3333'

export const GITHUB = {
  clientId: process.env.PASSPORT_GITHUB_CLIENT_ID || '',
  clientSecret: process.env.PASSPORT_GITHUB_CLIENT_SECRET || '',
  callbackURL: process.env.PASSPORT_GITHUB_CALLBACK || ''
}

export const GOOGLE = {
  clientId: process.env.PASSPORT_GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET || '',
  callbackURL: process.env.PASSPORT_GOOGLE_CALLBACK || ''
}

export default {
  secret: process.env.APP_SECRET || '',
  expiresIn: '10s'
}
