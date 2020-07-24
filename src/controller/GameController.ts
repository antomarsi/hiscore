import { Get, Put, JsonController } from 'routing-controllers';

@JsonController('game')
export class GameController {
  @Get('')
  get() {}

  @Put('/')
  put() {
    return [];
  }
}
