import HttpException from './httpException'
import { ValidationError } from 'class-validator'

export class ValidationErrorException extends HttpException {
  constructor(errors: ValidationError[]) {
    super(400, errors)
  }
}
