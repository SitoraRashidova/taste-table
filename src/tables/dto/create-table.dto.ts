import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateTableDto {
  @IsString()
  @IsNotEmpty()
  number: string;

  @IsNumber()
  @IsPositive()
  amount: number; 

  @IsString()
  @IsNotEmpty()
  restaurant_id: string;
}
