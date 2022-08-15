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
  async submitOrder(
    @Param('shop_id') shop_id: string,
    @Body() submitOrder: SubmitOrderDto,
    @Headers('Authorization') authorization: string,
  ) {
    const decodedJwt: JwtPayload = getDecodedJwt(authorization);
    return this.reservationService.submitOrder(
      submitOrder,
      shop_id,
      decodedJwt,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':post_id')
  async getOrders(
    @Param('post_id') post_id: string,
    @Headers('Authorization') authorization: string,
  ) {
    const decodedJwt: JwtPayload = getDecodedJwt(authorization);
    return this.reservationService.findOrders(post_id, decodedJwt);
  }
}
