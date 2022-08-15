import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { typeORMconfig } from './database/mysql/mysql.typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from './database/db.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './modules/reservation/reservation.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(typeORMconfig),
    AuthModule,
    ConfigurationModule,
    UserModule,
    PostModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
