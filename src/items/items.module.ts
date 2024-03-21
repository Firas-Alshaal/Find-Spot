import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/database';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
