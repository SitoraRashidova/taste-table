import { Module } from '@nestjs/common';
import { FoodCategoriesService } from './food_categories.service';
import { FoodCategoriesController } from './food_categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FoodCategories,
  FoodCategoriesSchema,
} from './schemas/food_category.schema';
import {
  Restaurant,
  RestaurantSchema,
} from '../restoran/schemas/restoran.schema';
import { Foods, FoodsSchema } from '../foods/schemas/food.schema';
import { Language, LanguageSchema } from '../language/schema/language.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FoodCategories.name,
        schema: FoodCategoriesSchema,
      },
      {
        name: Restaurant.name,
        schema: RestaurantSchema,
      },
      {
        name: Language.name,
        schema: LanguageSchema,
      },
    ]),
  ],
  controllers: [FoodCategoriesController],
  providers: [FoodCategoriesService],
})
export class FoodCategoriesModule {}
