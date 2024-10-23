import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFoodCategoryDto } from './dto/create-food_category.dto';
import { UpdateFoodCategoryDto } from './dto/update-food_category.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Restaurant,
  RestaurantDocument,
} from '../restoran/schemas/restoran.schema';
import {
  FoodCategories,
  FoodCategoriesDocument,
} from './schemas/food_category.schema';
import { Model } from 'mongoose';
import { Language, LanguageDocument } from '../language/schema/language.schema';

@Injectable()
export class FoodCategoriesService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
    @InjectModel(FoodCategories.name)
    private foodCategoriesModel: Model<FoodCategoriesDocument>,
    @InjectModel(Language.name)
    private langModel: Model<LanguageDocument>,
  ) {}
  async create(createFoodCategoryDto: CreateFoodCategoryDto) {
    const { restaurant_id } = createFoodCategoryDto;
    const restaurant = await this.restaurantModel.findById(restaurant_id);
    if (!restaurant) {
      throw new BadRequestException('No such food category');
    }
    const newFoodCategory = await this.foodCategoriesModel.create(
      createFoodCategoryDto,
    );
    restaurant.foodCategories.push(newFoodCategory);
    await restaurant.save();
    return newFoodCategory;
  }

  findAll() {
    return this.foodCategoriesModel
      .find()
      .populate('restaurant_id')
      .populate('foods');
  }

  findOne(id: string) {
    return this.foodCategoriesModel.findById(id);
  }

  update(id: string, updateFoodCategoryDto: UpdateFoodCategoryDto) {
    return this.foodCategoriesModel.findByIdAndUpdate(
      id,
      updateFoodCategoryDto,
      {
        new: true,
      },
    );
  }

  async updateByLangID(
    id: string,
    updateFoodCategoryDto: UpdateFoodCategoryDto,
  ) {
    const lang = await this.langModel.findById(updateFoodCategoryDto.lang_id);
    return this.foodCategoriesModel.findByIdAndUpdate(
      id,
      { ['name_' + lang.code]: updateFoodCategoryDto.value },
      { new: true, strict: false },
    );
  }

  remove(id: string) {
    return this.foodCategoriesModel.findByIdAndDelete(id);
  }
}
