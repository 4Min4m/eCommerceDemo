import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post()
  async create(@Body() body: { userId: string; amount: number }): Promise<Order> {
    return this.orderService.createOrder(body.userId, body.amount);
  }
}