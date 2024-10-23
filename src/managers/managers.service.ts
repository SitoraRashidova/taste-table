import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Manager, ManagerDocument } from './schemas/manager.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  Restaurant,
  RestaurantDocument,
} from '../restoran/schemas/restoran.schema';
@Injectable()
export class ManagersService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
    @InjectModel(Manager.name) private managerModel: Model<ManagerDocument>,
    private readonly jwtService: JwtService,
  ) {}
  async generateTokens(manager: ManagerDocument) {
    const payload = {
      id: manager._id,
      is_active: manager.is_active,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),

      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }

  async create(createManagerDto: CreateManagerDto) {
    const { password, confirm_password, restaurant_id } = createManagerDto;
    const restaurant = await this.restaurantModel.findById(restaurant_id);
    if (!restaurant) {
      throw new BadRequestException('No such table');
    }
    if (password !== confirm_password) {
      throw new BadRequestException('Password is not match');
    }

    const hashed_password = await bcrypt.hash(password, 7);

    const newManager = await this.managerModel.create({
      ...createManagerDto,
      hashed_password,
    });
    const tokens = await this.generateTokens(newManager);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    newManager.hashed_refresh_token = hashed_refresh_token;
    await newManager.save();
    restaurant.managers.push(newManager);
    await restaurant.save();
    return {
      message: 'Manager is added',
      access_token: tokens.access_token,
      id: newManager._id,
    };
  }

  findAll() {
    return this.managerModel.find().populate('restaurant_id');
  }

  findOne(id: string) {
    return this.managerModel.findById(id);
  }

  update(id: string, updateManagerDto: UpdateManagerDto) {
    return this.managerModel.findByIdAndUpdate(id, updateManagerDto, {
      new: true,
    });
  }
  remove(id: string) {
    return this.managerModel.findByIdAndDelete(id);
  }
  findById(id: string) {
    return this.managerModel.findById(id);
  }
  findByEmail(email: string) {
    return this.managerModel.findOne({ email: email });
  }
}
