import { JwtPayload } from 'src/modules/auth/interfaces/jwtpayload.interface';
import { JwtService } from '@nestjs/jwt';
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
} from '@nestjs/common';

@Controller('reservation')
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
  async findAllReservations(@Headers('Authorization') authorization: string) {
    const decodedJwt: JwtPayload = getDecodedJwt(authorization);
    return this.reservationService.findAllReservations(decodedJwt);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':reservation')
  async findReservation() {
    return this.reservationService.findReservation();
  }
}
