import { JwtPayload } from 'src/modules/auth/interfaces/jwtpayload.interface';
import { SubmitOrderDto } from './dto/submit.order.dto';
import { ReservationEntity } from '../../entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private reservationRepo: Repository<ReservationEntity>,
  ) {}
  async makeReservation(
    orderInfo: SubmitOrderDto,
    shop_id: any,
    decodedJwt: JwtPayload,
  ) {
    const { reserve_date } = orderInfo;
    const reservedDate = new Date(reserve_date);

    const orderInformation = {
      user_id: decodedJwt.id,
      reserve_date: reservedDate,
      shop_id,
    };
    const orderInsertResult = await this.reservationRepo.insert(
      orderInformation,
    );
    return orderInsertResult;
  }

  async findAllReservations(jwtHeader: JwtPayload) {
    const user_id = jwtHeader.id;
    const orderList = await this.reservationRepo.find({
      relations: ['shop'],
    });

    console.log('orderList', orderList);
    return orderList;
  }

  async findReservation() {}
}
