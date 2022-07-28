import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../auth/dto/user.create.dto';
import { UserDto } from '../auth/dto/user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { toUserDto, comparePasswords } from 'src/helpers/user.helper';
import { LoginUserDto } from '../auth/dto//login.user.dto';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}
  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { email, name, password } = userDto;

    const userInDb = await this.userRepo.findOne({ where: { email } });
    if (userInDb) {
      throw new HttpException('User Already Exists', HttpStatus.BAD_REQUEST);
    }

    const user: UserEntity = await this.userRepo.create({
      email,
      name,
      password,
    });

    try {
      await this.userRepo.save(user);
    } catch (err) {
      console.log('err', err);
    }
    return toUserDto(user);
  }

  async findUser(options?: object): Promise<UserDto> {
    const user = await this.userRepo.findOne(options);
    return toUserDto(user);
  }

  async findByLogin({ email, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('user does not exist', HttpStatus.BAD_REQUEST);
    }
    const chkPassword = await comparePasswords(password, user.password);

    if (!chkPassword) {
      throw new HttpException(
        'Password does not match',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return toUserDto(user);
  }
}
