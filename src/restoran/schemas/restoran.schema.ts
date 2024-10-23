import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Tables } from '../../tables/schemas/table.schema';
import { Manager } from '../../managers/schemas/manager.schema';
import { FoodCategories } from '../../food_categories/schemas/food_category.schema';
import { ApiProperty } from '@nestjs/swagger';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema({ versionKey: false })
export class Restaurant {
  @ApiProperty({ description: 'The name of the restaurant' })
  @Prop()
  name: string;

  @ApiProperty({ description: 'The phone number of the restaurant' })
  @Prop()
  phone_number: string;

  @ApiProperty({ description: 'A brief description of the restaurant' })
  @Prop()
  description: string;

  @ApiProperty({
    type: [String],
    description: 'List of table IDs associated with the restaurant',
  })
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tables',
      },
    ],
  })
  tables: Tables[];

  @ApiProperty({
    type: [String],
    description: 'List of manager IDs associated with the restaurant',
  })
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager',
      },
    ],
  })
  managers: Manager[];

  @ApiProperty({
    type: [String],
    description: 'List of food category IDs associated with the restaurant',
  })
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodCategories',
      },
    ],
  })
  foodCategories: FoodCategories[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
