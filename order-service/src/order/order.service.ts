import { Injectable } from '@nestjs/common';
import { SNS } from 'aws-sdk';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  private sns = new SNS({ region: 'us-east-1' });
  async createOrder(userId: string, amount: number): Promise<Order> {
    const order = new Order(Date.now().toString(), userId, amount);
    await this.sns
      .publish({
        TopicArn: process.env.SNS_TOPIC_ARN,
        Message: JSON.stringify({ orderId: order.id, status: order.status }),
      })
      .promise();
    return order;
  }
}