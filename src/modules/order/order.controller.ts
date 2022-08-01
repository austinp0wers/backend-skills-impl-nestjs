import { JwtAuthGuard } from './../../guards/jwt.guard';
import { OrderService } from './order.service';
import { Controller, Param, Post, UseGuards } from '@nestjs/common';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':post_id')
  async submitOrder(@Param('post_id') post_id: string) {
    return this.orderService.submitOrder(post_id);
  }
}
