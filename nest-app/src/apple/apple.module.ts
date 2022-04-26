import { Module } from '@nestjs/common';
import { AppleService } from './apple/apple.service';

@Module({
  providers: [AppleService],
})
export class AppleModule {}
