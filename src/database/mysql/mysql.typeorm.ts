import { LocationEntity } from './../../entities/location.entity';
import { ReservationEntity } from './../../entities/reservation.entity';
import { UserEntity } from './../../entities/user.entity';
import { paymentEntity } from './../../entities/payment.entity';
import { ShopEntity } from './../../entities/shop.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'reflect-metadata';

export const typeORMconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  entities: [
    ShopEntity,
    paymentEntity,
    UserEntity,
    ReservationEntity,
    LocationEntity,
  ],
  synchronize: true,
  migrations: [
    /*..*/
  ],
};
