import { HttpExceptionFilter } from './../../exceptions/httpException';
import { JwtPayload } from 'src/modules/auth/interfaces/jwtpayload.interface';
import { SubmitOrderDto } from './dto/submit.order.dto';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { ReservationService } from './reservation.service';
import { getDecodedJwt } from '../../helpers/jwt.helper';
import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  Get,
  Headers,
  UseFilters,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reservation')
@Controller('reservation')
@UseFilters(new HttpExceptionFilter())
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':shop_id')
  async makeReservation(
    @Param('shop_id') shop_id: string,
    @Body() submitOrder: SubmitOrderDto,
    @Headers('Authorization') authorization: string,
  ) {
    const decodedJwt: JwtPayload = getDecodedJwt(authorization);
    return this.reservationService.makeReservation(
      submitOrder,
      shop_id,
      decodedJwt,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMyReservations(@Headers('Authorization') authorization: string) {
    const decodedJwt: JwtPayload = getDecodedJwt(authorization);
    return this.reservationService.getMyReservations(decodedJwt);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':reservation_id')
  async getReservation(
    @Param('reservation_id') reservation_id: string,
    @Headers('Authorization') authorization: string,
  ) {
    const decodedJwt: JwtPayload = getDecodedJwt(authorization);
    return this.reservationService.getReservation(decodedJwt, reservation_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':reservation_id')
  async deleteReservation(
    @Param('reservation_id') reservation_id: string,
    @Headers('Authorization') authorization: string,
  ) {
    const decodedJwt: JwtPayload = getDecodedJwt(authorization);
    return this.reservationService.deleteReservation(
      decodedJwt,
      reservation_id,
    );
  }
}
