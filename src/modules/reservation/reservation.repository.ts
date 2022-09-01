import { ReservationEntity } from './../../entities/reservation.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepo: Repository<ReservationEntity>,
  ) {}

  async getMyReservations(user_id: string) {
    return await this.reservationRepo
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.shop_id', 'shop_id')
      .where('reservation.user_id = :user_id', { user_id })
      .getMany();
  }

  async saveReservation(orderInfoDto) {
    const result = await this.reservationRepo
      .createQueryBuilder()
      .insert()
      .into('reservations')
      .values(orderInfoDto)
      .execute();
    if (result) return { success: true, code: 200 };
  }

  async getReservation(user_id: string, reservation_id: string) {
    return await this.reservationRepo
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.shop_id', 'shop_id')
      .where('reservation.reservation_id = :reservation_id', { reservation_id })
      .andWhere('reservation.user_id = :user_id', { user_id })
      .getOne();
  }

  async deleteReservation(user_id: string, reservation_id: string) {
    const result = await this.reservationRepo
      .createQueryBuilder()
      .delete()
      .from('reservations')
      .where('user_id = :user_id', { user_id })
      .andWhere('reservation_id = :reservation_id', { reservation_id })
      .execute();
    return result;
  }
}
