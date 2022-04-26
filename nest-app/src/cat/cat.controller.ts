import {
  Controller,
  Get,
  Logger,
  OnModuleInit,
  Redirect,
  Scope,
} from '@nestjs/common';
import { Cat } from './cat';
import { CatService } from './cat.service';
// @ts-ignore
import { ContextIdFactory, LazyModuleLoader, ModuleRef } from '@nestjs/core';
import { AppleService } from '../apple/apple/apple.service';

@Controller('cats')
export class CatController {
  logger = new Logger(CatController.name);

  constructor(
    private lazyModuleLoader: LazyModuleLoader,
    private moduleRef: ModuleRef,
  ) {
    console.log('Run started');
    // this.run();
  }

  @Get()
  @Redirect('https://example.com', 301)
  getCat() {}

  // async run() {
  //     // console.log('running');
  //     console.log((this.catService === this.moduleRef.get(CatService))); // Pontosan ugyan azt fogja vissza adni
  //     console.log((this.catService === this.moduleRef.get(CatService, {strict: false}))); // Pontosan ugyan azt fogja vissza adni
  //     console.log((this.catService === await this.moduleRef.resolve(CatService))); // True
  //     const c1 = ContextIdFactory.create();
  //     const c2 = ContextIdFactory.create();
  //     const catServices = await Promise.all([
  //         this.moduleRef.resolve(CatService, c1),
  //         this.moduleRef.resolve(CatService, c2),
  //     ]);
  //     console.log('C: ', catServices[0] === catServices[1]); // false
  // }

  // @Get()
  // getCat(): Cat {
  //     return this.catService.getCat();
  // }
  //
  // @Get('/apple')
  // async getCatApple() {
  //     const {AppleModule} = await import('../apple/apple.module');
  //     const res = await this.lazyModuleLoader.load(() => AppleModule);
  //
  //     return res.get(AppleService).getApple();
  // }
}
