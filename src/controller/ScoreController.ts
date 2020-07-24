import { Get, Put, JsonController } from 'routing-controllers';

@JsonController("score")
export class ScoreController {
    @Get("")
    get() {

    }

    @Put("/")
    put() {
        return []
    }
}