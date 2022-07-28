import { PostEntity } from '../../entities/post.entity';
import { BoardEntity } from '../../entities/board.entity';
import { UserEntity } from '../../entities/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'meditest',
  entities: [UserEntity, BoardEntity, PostEntity],
  synchronize: true,
  typeorm: 'ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js',
};
