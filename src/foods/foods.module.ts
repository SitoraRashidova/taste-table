import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Foods, FoodsSchema } from './schemas/food.schema';
import { FoodCategories, FoodCategoriesSchema } from '../food_categories/schemas/food_category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Foods.name,
        schema: FoodsSchema,
      },
      {
        name: FoodCategories.name,
        schema: FoodCategoriesSchema,
      },
    ]),
  ],
  controllers: [FoodsController],
  providers: [FoodsService],
})
export class FoodsModule {}
