import {
  Controller,
  Get,
  Inject,
  Logger,
  OnModuleInit,
  Scope,
} from '@nestjs/common';
import { ContextIdFactory, ModuleRef, REQUEST } from '@nestjs/core';
import { ScopedService } from './scoped/scoped.service';
import { RegularService } from './regular/regular.service';

// @Controller({scope: Scope.REQUEST, path: 'module-ref'})
@Controller('module-ref')
export class ModuleRefController implements OnModuleInit {
  private readonly logger: Logger = new Logger(ModuleRefController.name);

  constructor(
    // @Inject(REQUEST) private request: any,
    private moduleRef: ModuleRef,
  ) {}

  @Get()
  async getNull() {
    await this.scopeModuleTest();
    await this.scopeModuleWithContextIdFactory();
    await this.regularModuleTest();
    return null;
  }

  async onModuleInit(): Promise<void> {
    await this.scopeModuleTest();
    await this.scopeModuleWithContextIdFactory();
    await this.regularModuleTest();
  }

  private async scopeModuleTest(): Promise<void> {
    // this.moduleRef.get nem működik, mert nem DEFAULT a Scope
    const scopedService1: ScopedService = await this.moduleRef.resolve(
      ScopedService,
    );
    const scopedService2: ScopedService = await this.moduleRef.resolve(
      ScopedService,
    );

    this.logger.log(
      `Test 1: Is scoped service the same: ${
        scopedService1 === scopedService2
      }`,
    );
  }

  private async scopeModuleWithContextIdFactory(): Promise<void> {
    // Létrehozunk egy context-et ami olyan mintha egy module session lenne
    const contextId = ContextIdFactory.create();
    const scopedService1: ScopedService = await this.moduleRef.resolve(
      ScopedService,
      contextId,
    );
    const scopedService2: ScopedService = await this.moduleRef.resolve(
      ScopedService,
      contextId,
    );

    this.logger.log(
      `Test 2: Is scoped service the same: ${
        scopedService1 === scopedService2
      }`,
    );

    // Itt már a contextId-val hozzá rendelhetjük egy adott requesthez a context-et
    // const request: any = { ...this.request };
    // this.moduleRef.registerRequestByContextId(request, contextId);
    // const contextIdFromRequest = ContextIdFactory.getByRequest(request);
    // console.log(contextId)
    //
    // console.log(contextIdFromRequest, contextId);
    // this.logger.log(`Test 2.1: Context id's is matching: ${contextIdFromRequest === contextId}`);
  }

  private regularModuleTest(): void {
    const regularService1: RegularService = this.moduleRef.get(RegularService);
    const regularService2: RegularService = this.moduleRef.get(RegularService);

    // A resolve-al létrehoz egyet, nem fogja a meglévőt vissza adni
    // A get-el vissza adja a meglévőt de csak ha DEFAULT Scope-ban van (singleton)
    // { strict: false } amennyiben másik module provider példánya kell akkor ezzel jelezzük, hogy azt kérjük
    // Amennyiben másik moduleból kérünk servicet akárhogy létezik a példány újat kapunk a dependency subtree miatt

    this.logger.log(
      `Test 3: Is regular not scoped service the same: ${
        regularService1 === regularService2
      }`,
    );
  }
}
