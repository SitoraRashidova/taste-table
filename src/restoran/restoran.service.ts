import { Injectable } from '@nestjs/common';
import { CreateRestoranDto } from './dto/create-restoran.dto';
import { UpdateRestoranDto } from './dto/update-restoran.dto';
import { Restaurant, RestaurantDocument } from './schemas/restoran.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RestoranService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
  ) {}

  create(createRestoranDto: CreateRestoranDto) {
    return this.restaurantModel.create(createRestoranDto);
  }

  findAll() {
    return this.restaurantModel
      .find()
      .populate([
        { path: 'tables' },
        { path: 'managers' },
        { path: 'foodCategories' },
      ]);
  }

  findOne(id: number) {
    return this.restaurantModel.findById(id);
  }

  update(id: number, updateRestoranDto: UpdateRestoranDto) {
    return this.restaurantModel.findByIdAndUpdate(id, updateRestoranDto, {
      new: true,
    });
  }

  remove(id: number) {
    return this.restaurantModel.findByIdAndDelete(id);
  }
}
