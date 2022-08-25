import { JwtService } from '@nestjs/jwt';
import { ShopEntity } from '../../entities/shop.entity';
import { ShopService } from './shop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopRepository } from './shop.repository';
@Module({
  imports: [TypeOrmModule.forFeature([ShopEntity])],
  exports: [ShopService],
  controllers: [ShopController],
  providers: [ShopService, JwtService, ShopRepository],
})
export class ShopModule {}
