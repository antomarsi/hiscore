import {
  Get,
  Put,
  JsonController,
  Post,
  UseBefore,
  Req,
  Res,
  Params,
  Param,
  Body,
} from 'routing-controllers';
import { checkJwt } from '../middlewares/checkJwt';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { validate, IsString } from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';

class LoginBody {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

class AuthCreate {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
@OpenAPI({
  security: [{ basicAuth: [] }],
})
@JsonController('/api/auth')
export class AuthController {
  @Post('/login')
  @OpenAPI({ summary: 'login on the system' })
  async login(@Body({ validate: true }) params: LoginBody, @Res() res: Response) {
    const { email, password } = params;
    //Check if username and password are set
    if (!(email && password)) {
      res.status(400).send();
    }

    //Get user from database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { email } });
    } catch (error) {
      return res.status(401).send();
    }

    //Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      return res.status(401).send();
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign({ userId: user.id, username: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    //Send the jwt in the response
    return res.send(token);
  }

  @Post('/create')
  @OpenAPI({ summary: 'Create a new User' })
  async newUser(@Body({ validate: true }) params: AuthCreate, @Res() res: Response) {
    const { email, password } = params;
    //Get parameters from the body
    let user = new User();
    user.email = email;
    user.password = password;

    //Validade if the parameters are ok
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Hash the password, to securely store on DB
    user.hashPassword();

    //Try to save. If fails, the email is already in use
    const userRepository = getRepository(User);
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send('email already in use');
      return;
    }

    //If all ok, send 201 response
    res.status(201).send('User created');
  }

  @Post('/change-password')
  @UseBefore(checkJwt)
  async changePassword(@Req() req: Request, @Res() res: Response) {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    //Get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    //Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  }
}
