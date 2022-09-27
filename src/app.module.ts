import { MessageModule } from './modules/redis/message.module';
import { CacheDBModule } from './modules/redis/redisCache.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { typeORMconfig } from './database/mysql/mysql.typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from './database/db.module';
import { UserModule } from './modules/user/user.module';
import { ShopModule } from './modules/shop/shop.module';
import { ConfigModule } from '@nestjs/config';
import { ReservationModule } from './modules/reservation/reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CacheDBModule,
    MessageModule,
    TypeOrmModule.forRoot(typeORMconfig),
    AuthModule,
    ConfigurationModule,
    UserModule,
    ShopModule,
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
