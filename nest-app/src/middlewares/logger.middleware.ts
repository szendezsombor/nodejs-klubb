import {Injectable, NestMiddleware} from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void): any {
        console.log('Request url: ', req.url)
        next(); // Ha tovább engednénk a futást
    }

}
