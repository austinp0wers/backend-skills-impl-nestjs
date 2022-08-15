import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'meditest',
  entities: ['dist/entities/*.entity{.ts,.js}', 'src/*.entity{.ts,.js}'],
  synchronize: true,
  typeorm: 'ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js',
};
