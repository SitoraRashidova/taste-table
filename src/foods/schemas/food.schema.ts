// foods.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Restaurant } from '../../restoran/schemas/restoran.schema';
import { FoodCategories } from '../../food_categories/schemas/food_category.schema';

export type FoodsDocument = HydratedDocument<Foods>;

@Schema({ versionKey: false })
export class Foods {
  @ApiProperty({
    description: 'The ID of the food category this food item belongs to',
    type: String,
    example: '64b8f2f03a1fbb12cfc9efc3',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodCategories',
  })
  food_category_id: FoodCategories;

  @ApiProperty({
    description: 'The name of the food item',
    example: 'Cheeseburger',
  })
  @Prop()
  name: string;

  @ApiProperty({
    description: 'A brief description of the food item',
    example:
      'A juicy cheeseburger with fresh lettuce, tomato, and cheddar cheese',
    required: false,
  })
  @Prop()
  description: string;

  @ApiProperty({
    description: 'The price of the food item',
    type: Number,
    example: 8.99,
  })
  @Prop()
  price: number;

  @ApiProperty({
    description: 'Indicates whether the food item is currently available',
    type: Boolean,
    example: true,
  })
  @Prop()
  is_available: boolean;
}

export const FoodsSchema = SchemaFactory.createForClass(Foods);
