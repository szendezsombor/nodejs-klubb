import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TestModule} from './test/test.module';
import {PlayerModule} from "./player/player.module";
// import {TypeOrmModule} from "@nestjs/typeorm";
// import {PlayerEntity} from "./player/entity/player.entity";
import {LoggerMiddleware} from "./middlewares/logger.middleware";
import {PlayerController} from "./player/player.controller";
import { CatController } from './cat/cat.controller';
import { VideoController } from './video/video.controller';
import {CatService} from "./cat/cat.service";
import { AppleModule } from './apple/apple.module';

@Module({
  imports: [TestModule,
      // PlayerModule,
  //     TypeOrmModule.forRoot({
  //     type: 'mysql',
  //     host: '192.168.0.253',
  //     port: 3307,
  //     username: 'test',
  //     password: 'uA6/44U[k9',
  //     database: 'test',
  //     entities: [PlayerEntity],
  //     synchronize: true,
  // }),
      AppleModule],
  controllers: [AppController, CatController, VideoController],
  providers: [AppService, CatService],
    // /alma lazyloading router: () => module
    // { provide: CatService, useFactory: (opts: any) =>  new CatService() }
    // { provide: CatService, useExisting: AppService  }
    // useValue: { getCat: jasmine.createSpy() }
    // { provide: CatService, useClass: CatService } -> CatService
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(LoggerMiddleware).forRoutes(PlayerController);
    }
}
