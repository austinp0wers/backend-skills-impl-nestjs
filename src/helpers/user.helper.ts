import { UserDto } from 'src/modules/auth/dto/user.dto';
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

export const toUserDto = (userInfo: UserEntity) => {
  const { user_id, email, name, role } = userInfo;

  const userDto: UserDto = {
    user_id,
    email,
    name,
    role,
  };
  return userDto;
};

export const comparePasswords = async (inputPassword, actualPassword) => {
  return await bcrypt.compare(inputPassword, actualPassword);
};
