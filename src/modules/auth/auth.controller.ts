import {
  Post,
  Body,
  Controller,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/user.create.dto';
import { RegisterStatus } from './interfaces/register.status';
import { LoginUserDto } from './dto/login.user.dto';
import { LoginStatus } from './interfaces/loginstatus.interface';
import { HttpExceptionFilter } from 'src/exceptions/httpException';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: '회원가입' })
  @Post('register')
  @UseFilters(new HttpExceptionFilter())
  private async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegisterStatus> {
    const result: RegisterStatus = await this.authService.register(
      createUserDto,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  @UseFilters(new HttpExceptionFilter())
  private async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }
}
