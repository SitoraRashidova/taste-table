import { ApiProperty } from '@nestjs/swagger';

export class CreateRestoranDto {
  @ApiProperty({ description: 'The name of the restaurant' })
  name: string;

  @ApiProperty({ description: 'The phone number of the restaurant' })
  phone_number: string;

  @ApiProperty({ description: 'A brief description of the restaurant' })
  description: string;
}
