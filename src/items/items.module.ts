import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/database';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { JwtModule } from '@nestjs/jwt';
import { BunnyServiceModule } from 'src/common/bunny/bunny.module';

@Module({
  imports: [PrismaModule, JwtModule, BunnyServiceModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
