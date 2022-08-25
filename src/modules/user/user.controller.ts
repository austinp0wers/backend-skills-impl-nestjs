import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { LoggingInterceptor } from '../../interceptors/success.interceptor';
import { ConvertToStringPipe } from '../../filters/string.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
@UseInterceptors(LoggingInterceptor)
export class UserController {
  @ApiOperation({ summary: '회원 조회' })
  @Get(':id')
  private welcome(
    @Param('id', ParseIntPipe, ConvertToStringPipe) param: number,
  ) {
    return { code: 400, param };
  }
}
