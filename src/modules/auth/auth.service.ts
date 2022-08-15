import { Body, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login.user.dto';
import { CreateUserDto } from './dto/user.create.dto';
import { UserDto } from './dto/user.dto';
import UserService from 'src/modules/user/user.service';
import { LoginStatus } from './interfaces/loginstatus.interface';
import { RegisterStatus } from './interfaces/register.status';
import { JwtPayload } from './interfaces/jwtpayload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegisterStatus> {
    let status: RegisterStatus = {
      success: true,
      message: 'user successfully registered',
    };
    try {
      await this.userService.create(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    let user;
    try {
      user = await this.userService.findByLogin(loginUserDto);
    } catch (err) {
      throw Error('findByLogin Internal server error');
    }

    let token;
    try {
      token = this._createJWTToken(user);
    } catch (err) {
      console.log(err);
    }

    return {
      email: user.email,
      ...token,
    };
  }

  private _createJWTToken({ id, role }: UserDto): any {
    const expiresIn = process.env.EXPIRESIN;

    const user: JwtPayload = { id, role };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }
}
