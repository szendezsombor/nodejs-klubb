import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TestModule} from './test/test.module';
import {PlayerModule} from "./player/player.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PlayerEntity} from "./player/entity/player.entity";
import {LoggerMiddleware} from "./middlewares/logger.middleware";
import {PlayerController} from "./player/player.controller";
import { CatController } from './cat/cat.controller';
import { VideoController } from './video/video.controller';

@Module({
  imports: [TestModule, PlayerModule, TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.0.253',
      port: 3307,
      username: 'test',
      password: 'uA6/44U[k9',
      database: 'test',
      entities: [PlayerEntity],
      synchronize: true,
  })],
  controllers: [AppController, CatController, VideoController],
  providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(LoggerMiddleware).forRoutes(PlayerController);
    }
}
