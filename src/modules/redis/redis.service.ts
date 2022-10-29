import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';
@Injectable()
export class MessageService {
  publish(publishInfo: string) {
    const pub = createClient({
      url: 'redis://localhost:6379',
      auth_pass: 1234,
    });
    pub.publish('shops_id', publishInfo);
  }
}
