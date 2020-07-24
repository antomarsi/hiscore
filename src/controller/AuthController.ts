import { Get, Put, JsonController, Post, UseBefore, Req, Res } from 'routing-controllers';
import { checkJwt } from '../middlewares/checkJwt';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { validate } from 'class-validator';

@JsonController('auth')
export class AuthController {
  @Get('login')
  async login(@Req() req: Request, @Res() res: Response) {
    //Check if username and password are set
    let { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send();
    }

    //Get user from database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { email } });
    } catch (error) {
      res.status(401).send();
    }

    //Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign({ userId: user.id, username: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    //Send the jwt in the response
    res.send(token);
  }

  @Post('/create')
  async newUser(@Req() req: Request, @Res() res: Response) {
    //Get parameters from the body
    let { email, password, role } = req.body;
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
