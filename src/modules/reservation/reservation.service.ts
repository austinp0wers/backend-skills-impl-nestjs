import { JwtPayload } from 'src/modules/auth/interfaces/jwtpayload.interface';
import { SubmitOrderDto } from './dto/submit.order.dto';
import { ReservationEntity } from '../../entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private orderRepo: Repository<ReservationEntity>,
  ) {}
  async submitOrder(
    orderInfo: SubmitOrderDto,
    shop_id: string,
    decodedJwt: JwtPayload,
  ) {
    const { reserve_date } = orderInfo;
    const orderInformation = {
      user_id: decodedJwt.id,
      reserve_date,
      shop_id,
    };
    const orderInsertResult = await this.orderRepo.insert(orderInformation);
    console.log('orderInsertResult', orderInsertResult);
    return orderInsertResult;
  }
  async findOrders(post_id: string, jwtHeader: JwtPayload) {
    //  user_id 가 jwtHeader.id 인 orders 를 orders 테이블에서검색
    //post_id 로 join 을 해서, 해당 post 의 title 이랑 category 만 불러 오자.

    const user_id = jwtHeader.id;
    const orderList = await this.orderRepo.find({
      relations: ['post_id'],
    });

    console.log('orderList', JSON.stringify(orderList));
    return orderList;
  }
}
