import {
  ArgumentsHost,
  Catch,
  Controller,
  ExceptionFilter,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from './exception-filter';

@Controller('error')
// @UseFilters(HttpExceptionFilter) // /error {"statusCode":403,"timestamp":"2022-04-12T11:13:06.378Z","path":"/error"}
// app.useGlobalFilters(new HttpExceptionFilter()); // Minden routera
//  providers: [ // Module szinten
//   {
//     provide: APP_FILTER,
//     useClass: HttpExceptionFilter,
//   },
// ],
export class ErrorTestController {
  @Get() // GET /error
  @UseFilters(HttpExceptionFilter) // {"statusCode":403,"timestamp":"2022-04-12T11:13:06.378Z","path":"/error"}
  private getError(): void {
    // Alap hiba kezelés:
    // throw new Error('Alma'); // {"statusCode":500,"message":"Internal server error"}
    // Custom exceptionok
    // throw new MyError('Forbidden', 403); // {"statusCode":403,"message":"Forbidden"}
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN); // {"statusCode":403,"message":"Forbidden"}
    // throw new MyForbiddenHttpException(); // {"statusCode":403,"message":"Forbidden"}
    // Beépített exceptionok
    throw new ForbiddenException(); // {"statusCode":403,"message":"Forbidden"}

    // Ha a body-ban mást szeretnénk mint a status code és a message
    // throw new HttpException(
    //   {
    //     myCustomMessage: 'Something happened :(',
    //     code: 8008,
    //   },
    //   HttpStatus.FORBIDDEN,
    // ); // {"myCustomMessage":"Something happened :(","code":8008}
  }
}

class MyError extends Error {
  constructor(public message: string, public statusCode: number) {
    super();
  }
}

class MyForbiddenHttpException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
