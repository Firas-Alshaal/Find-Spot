import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { jwtConfig } from './common/config/jwt.config';
import { PrismaModule } from './common/database';
import { AccessTokenGuard } from './common/guards/access-token.guard';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwtConfig],
      cache: true,
      isGlobal: true,
    }),
    UsersModule,
    ItemsModule,
    CategoriesModule,
    PrismaModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AppController],
  providers: [AppService, AccessTokenGuard],
})
export class AppModule {}
