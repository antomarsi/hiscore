import ScoreController from './controller/ScoreController'
import AuthController from './controller/AuthController'
import GameController from './controller/GameController'

import { Router } from 'express'

const controllersV1 = [AuthController, GameController, ScoreController]

const routes = Router()

controllersV1.forEach(controller => {
  routes.use(`/v1${controller.path}`, new controller().router)
})

export default routes
