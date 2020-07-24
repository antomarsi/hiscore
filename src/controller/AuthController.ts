import { Get, Put, JsonController } from 'routing-controllers';

@JsonController("auth")
export class AuthController {
    @Get("")
    get() {

    }

    @Put("/")
    put() {
        return []
    }
}