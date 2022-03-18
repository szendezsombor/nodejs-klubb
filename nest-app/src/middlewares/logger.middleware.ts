import {Injectable, Logger, NestMiddleware} from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger: Logger = new Logger(LoggerMiddleware.name);

    use(req: Request, res: Response, next: () => void): any {
        this.logger.log('Request url: ', req.url)
        next(); // Ha tovább engednénk a futást
    }

}
