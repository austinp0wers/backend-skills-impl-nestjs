import { ReservationRepository } from './reservation.repository';
import { ReservationEntity } from '../../entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
@Module({
  imports: [TypeOrmModule.forFeature([ReservationEntity])],
  exports: [ReservationService],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository],
})
export class ReservationModule {}
