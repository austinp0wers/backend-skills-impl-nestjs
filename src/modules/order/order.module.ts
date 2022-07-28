import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
