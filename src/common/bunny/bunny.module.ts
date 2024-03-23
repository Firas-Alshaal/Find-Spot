import { Module } from '@nestjs/common';
import { BunnyFileService } from './bunny-file.service';

@Module({
  providers: [BunnyFileService],
  exports: [BunnyFileService],
})
export class BunnyServiceModule {}
