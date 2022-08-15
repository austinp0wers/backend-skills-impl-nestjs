import { IsNotEmpty } from 'class-validator';

export class SubmitOrderDto {
  @IsNotEmpty()
  reserve_date: string;
}
