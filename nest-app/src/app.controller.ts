import { Controller, Get, Header, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('/players/c7ff9999-80b3-4015-a371-279e12e57444')
  @Header('X-Example-Header', 'This is fine.')
  getHello(): string {
    return this.appService.getHello();
  }
}
