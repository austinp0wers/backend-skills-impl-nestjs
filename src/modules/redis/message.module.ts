import { MessageSubscriber } from './redis.subscriber';
import { MessageService } from './redis.service';
import { MessageController } from './redis.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [MessageController],
  providers: [MessageService, MessageSubscriber],
})
export class MessageModule {}
