import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({
    description: 'The unique ID of the client making the reservation',
    example: 1,
  })
  client_id: number;

  @ApiProperty({
    description: 'The unique ID of the table being reserved',
    example: 2,
  })
  table_id: number;

  @ApiProperty({
    description: 'The date and time for the reservation in ISO 8601 format',
    example: '2024-10-23T19:30:00Z',
  })
  reservation_time: string;

  @ApiProperty({
    description: 'The total number of guests for the reservation',
    example: 4,
  })
  guests_amount: number;
}
