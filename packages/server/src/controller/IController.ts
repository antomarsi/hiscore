import { Router } from "express"

abstract class IControllerBase {
  public static path: string
  public router : Router = Router();
  constructor() {
    this.initRoutes()
  }
  public initRoutes() {
    throw new Error('Not Implemented')
  }
}

export default IControllerBase
