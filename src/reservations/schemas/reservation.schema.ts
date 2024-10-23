import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../../clients/schemas/client.schema';
import { Tables } from '../../tables/schemas/table.schema';

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema({ versionKey: false })
export class Reservation {
  @ApiProperty({
    description: 'The unique ID of the client making the reservation',
    type: mongoose.Schema.Types.ObjectId,
    example: '60c72b2f5f1b2c001c8d4f45', // Example ObjectId
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  })
  client_id: Client;

  @ApiProperty({
    description: 'The unique ID of the table being reserved',
    type: mongoose.Schema.Types.ObjectId,
    example: '60c72b2f5f1b2c001c8d4f46', // Example ObjectId
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tables',
  })
  table_id: Tables;

  @ApiProperty({
    description: 'The date and time for the reservation in ISO 8601 format',
    example: '2024-10-23T19:30:00Z',
  })
  @Prop()
  reservation_time: string;

  @ApiProperty({
    description: 'The total number of guests for the reservation',
    example: 4,
  })
  @Prop()
  guests_amount: number;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
