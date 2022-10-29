import { MessageService } from './redis.service';
import { Controller, Post } from '@nestjs/common';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
}
