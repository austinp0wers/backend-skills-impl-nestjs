import { OrderService } from './order.service';
import { Controller, Post } from '@nestjs/common';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async submitOrder() {
    this.orderService.submitOrder();
  }
}
