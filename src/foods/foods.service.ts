import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Foods, FoodsDocument } from './schemas/food.schema';
import {
  FoodCategories,
  FoodCategoriesDocument,
} from '../food_categories/schemas/food_category.schema';
import { Model } from 'mongoose';

@Injectable()
export class FoodsService {
  constructor(
    @InjectModel(Foods.name)
    private foodsModel: Model<FoodsDocument>,
    @InjectModel(FoodCategories.name)
    private foodCategoriesModel: Model<FoodCategoriesDocument>,
  ) {}
  async create(createFoodDto: CreateFoodDto) {
    const { food_category_id } = createFoodDto;
    const foodCategories =
      await this.foodCategoriesModel.findById(food_category_id);
    console.log(foodCategories);
    if (!foodCategories) {
      throw new BadRequestException('No such food');
    }
    const newFood = await this.foodsModel.create(createFoodDto);
    foodCategories.foods.push(newFood);
    await foodCategories.save();
    return newFood;
  }

  findAll() {
    return this.foodsModel.find().populate('food_category_id');
  }

  findOne(id: string) {
    return this.foodsModel.findById(id);
  }

  update(id: string, updateFoodDto: UpdateFoodDto) {
    return this.foodsModel.findByIdAndUpdate(id, updateFoodDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.foodsModel.findByIdAndDelete(id);
  }
}
