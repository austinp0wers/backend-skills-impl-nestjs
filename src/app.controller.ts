import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  public getHealth(@Res() res) {
    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      success: true,
    });
  }
}
