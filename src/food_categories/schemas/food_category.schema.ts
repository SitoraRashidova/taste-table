// food-categories.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Restaurant } from '../../restoran/schemas/restoran.schema';
import { Foods } from '../../foods/schemas/food.schema';

export type FoodCategoriesDocument = HydratedDocument<FoodCategories>;

@Schema({ versionKey: false })
export class FoodCategories {
  @ApiProperty({
    description: 'The ID of the restaurant this food category belongs to',
    type: String,
    example: '64b8f2f03a1fbb12cfc9efc3',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  })
  restaurant_id: Restaurant;

  @ApiProperty({
    description: 'The name of the food category',
    example: 'Appetizers',
  })
  @Prop()
  name: string;

  @ApiProperty({
    description: 'A brief description of the food category',
    example: 'A selection of starter dishes',
  })
  @Prop()
  description: string;

  @ApiProperty({
    description: 'A list of food items under this category',
    type: [String],
    example: ['64b8f2f03a1fbb12cfc9efc4', '64b8f2f03a1fbb12cfc9efc5'],
  })
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Foods',
      },
    ],
  })
  foods: Foods[];
}

export const FoodCategoriesSchema =
  SchemaFactory.createForClass(FoodCategories);
