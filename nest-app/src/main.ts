import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NextFunction} from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  // app.set('x-powered-by');
  await app.listen(3000);
}
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
};

bootstrap();
