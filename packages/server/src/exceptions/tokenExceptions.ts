import HttpException from './httpException'

export class InvalidTokenException extends HttpException {
  constructor() {
    super(401, 'Invalid Token')
  }
}
