import { SubmitOrderDto } from './dto/submit.order.dto';
import { saveOrderInformationDto } from './dto/save.order.dto';
import { ReservationRepository } from './reservation.repository';
import { JwtPayload } from 'src/modules/auth/interfaces/jwtpayload.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationService {
  constructor(private readonly reservationRepo: ReservationRepository) {}

  async makeReservation(
    orderInfo: SubmitOrderDto,
    shop_id: string,
    decodedJwt: JwtPayload,
  ) {
    const reservedDate = new Date(orderInfo.reserve_date);
    const orderInformation: saveOrderInformationDto = {
      user_id: decodedJwt.user_id,
      reserve_date: reservedDate,
      shop_id,
    };
    const orderInsertResult = await this.reservationRepo.saveReservation(
      orderInformation,
    );

    return orderInsertResult;
  }

  async getMyReservations(jwtHeader: JwtPayload) {
    const user_id = jwtHeader.user_id;
    const orderList = await this.reservationRepo.getMyReservations(user_id);
    return orderList;
  }

  async getReservation(jwtHeader: JwtPayload, reservation_id: string) {
    const user_id = jwtHeader.user_id;

    const reservation = await this.reservationRepo.getReservation(
      user_id,
      reservation_id,
    );

    return reservation;
  }

  async deleteReservation(jwtHeader: JwtPayload, reservation_id: string) {
    const user_id = jwtHeader.user_id;
    await this.reservationRepo.deleteReservation(user_id, reservation_id);

    return { success: true };
  }
}
