import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Restaurant } from '../../restoran/schemas/restoran.schema';
import { ApiProperty } from '@nestjs/swagger';

export type ManagerDocument = HydratedDocument<Manager>;

@Schema({ versionKey: false })
export class Manager {
  @ApiProperty({
    description: 'The ID of the restaurant where the manager works',
    type: mongoose.Schema.Types.ObjectId,
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  })
  restaurant_id: Restaurant;

  @ApiProperty({
    description: 'The full name of the manager',
    example: 'John Doe',
  })
  @Prop()
  full_name: string;

  @ApiProperty({
    description: 'The unique email address of the manager',
    example: 'johndoe@example.com',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    description: 'The hashed password of the manager',
    example: 'hashed_password_string',
  })
  @Prop()
  hashed_password: string;

  @ApiProperty({
    description: 'The hashed refresh token for the manager',
    example: 'hashed_refresh_token_string',
  })
  @Prop()
  hashed_refresh_token: string;

  @ApiProperty({
    description: 'Indicates whether the manager account is active',
    default: true,
  })
  @Prop({ default: true })
  is_active: boolean;
}

export const ManagerSchema = SchemaFactory.createForClass(Manager);
