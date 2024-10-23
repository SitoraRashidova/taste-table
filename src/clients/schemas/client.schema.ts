import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Reservation } from '../../reservations/schemas/reservation.schema';
import { ApiProperty } from '@nestjs/swagger'; 

export type ClientDocument = HydratedDocument<Client>;

@Schema({ versionKey: false })
export class Client {
  @ApiProperty({ description: 'The name of the client' }) 
  @Prop()
  name: string;

  @ApiProperty({ description: 'The email of the client' }) 
  @Prop()
  email: string;

  @ApiProperty({ description: 'The hashed password of the client' }) 
  @Prop()
  hashed_password: string;

  @ApiProperty({ description: 'The hashed refresh token of the client' }) 
  @Prop()
  hashed_refresh_token: string;

  @ApiProperty({
    description: 'Indicates if the client is active',
    default: true,
    example: true, 
  }) 
  @Prop({ default: true }) 
  is_active: boolean;

  @ApiProperty({
    type: [String], 
    description: 'List of reservations associated with the client',
    example: ['60d5ec49f1e3a4b8b2c1f5a1', '60d5ec49f1e3a4b8b2c1f5a2'], 
  })
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservations',
      },
    ],
    default: [], 
  })
  reservations: Reservation[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);
