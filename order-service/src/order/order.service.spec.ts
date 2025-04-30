import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService],
    }).compile();
    service = module.get<OrderService>(OrderService);
  });
  it('should create an order', async () => {
    const order = await service.createOrder('user1', 100);
    expect(order).toHaveProperty('id');
    expect(order.status).toBe('pending');
  });
});