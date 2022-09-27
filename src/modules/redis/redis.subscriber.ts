import { createClient } from 'redis';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class MessageSubscriber implements OnApplicationBootstrap {
  onApplicationBootstrap() {
    this.subscribeMessage();
  }

  async subscribeMessage() {
    const subscriber = createClient({
      url: 'redis://localhost:6379',
      auth_pass: 1234,
    });
    subscriber.subscribe('shops_id');
    subscriber.on('message', (channel, message) => {
      const data = JSON.parse(message);
      console.log('channel', channel);
      console.log(data);
    });
    return;
  }
}
