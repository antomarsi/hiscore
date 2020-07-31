import ScoreController from './controller/ScoreController'
import AuthController from './controller/AuthController'
import GameController from './controller/GameController'

import { Router } from 'express'

const controllers = [
  new AuthController(),
  new GameController(),
  new ScoreController()
]

const routes = Router()
controllers.forEach(controller => {
  routes.use("/", controller.router);
})

export default routes;
