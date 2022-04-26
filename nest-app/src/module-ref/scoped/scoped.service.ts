import { Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class ScopedService implements OnModuleInit {
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): any {}
}
