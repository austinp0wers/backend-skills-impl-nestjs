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
    return await this.reservationRepo.find({
      where: {
        user_id,
      },
      relations: ['shop_id'],
    });
  }

  async saveReservation(orderInfoDto) {
    await this.reservationRepo.save(orderInfoDto);
    return { success: true, code: 200 };
  }

  async getReservation(user_id: string, reservation_id: string) {
    return await this.reservationRepo.find({
      where: {
        reservation_id,
        user_id,
      },
      relations: ['shop_id'],
    });
  }

  async deleteReservation(user_id: string, reservation_id: string) {
    const result = await this.reservationRepo.delete({
      user_id,
      reservation_id,
    });
    return result;
  }
}
