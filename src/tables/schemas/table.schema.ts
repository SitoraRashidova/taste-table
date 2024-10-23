import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Restaurant } from '../../restoran/schemas/restoran.schema';
import { Reservation } from '../../reservations/schemas/reservation.schema';

export type TablesDocument = HydratedDocument<Tables>;

@Schema({ versionKey: false })
export class Tables {
  @Prop({ required: true })
  number: string; 

  @Prop({ required: true, type: Number }) 
  amount: number; 

  @Prop()
  qr_code: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  })
  restaurant_id: Restaurant; 

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation',
      },
    ],
  })
  reservations: Reservation[];
}

export const TablesSchema = SchemaFactory.createForClass(Tables);
