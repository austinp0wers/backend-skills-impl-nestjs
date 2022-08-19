import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'reflect-metadata';

export const typeORMconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  entities: ['dist/entities/*.entity{.ts,.js}', 'src/*.entity{.ts,.js}'],
  synchronize: true,
  // migrations: [
  //   /*..*/
  // ],
  typeorm: 'ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js',
};
