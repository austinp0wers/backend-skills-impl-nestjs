import { JwtService } from '@nestjs/jwt';
import { ShopEntity } from '../../entities/shop.entity';
import { ShopService } from './shop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
@Module({
  imports: [TypeOrmModule.forFeature([ShopEntity])],
  controllers: [ShopController],
  providers: [ShopService, JwtService],
})
export class ShopModule {}
