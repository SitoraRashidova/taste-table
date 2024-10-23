import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Restaurant,
  RestaurantDocument,
} from '../restoran/schemas/restoran.schema';
import { Tables, TablesDocument } from './schemas/table.schema';
import { Model } from 'mongoose';
import * as QRCode from 'qrcode';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class TablesService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
    @InjectModel(Tables.name) private tablesModel: Model<TablesDocument>,
  ) {}
  async generateQRCodeFile(text: string, fileName: string): Promise<string> {
    try {
      const qrCodeBuffer = await QRCode.toBuffer(text);
      const filePath = path.join(
        __dirname,
        '../public/qr-codes',
        `${fileName}.png`,
      );
      fs.mkdirSync(path.dirname(filePath), { recursive: true }),
        fs.writeFileSync(filePath, qrCodeBuffer);
      return filePath;
    } catch (error) {
      throw new Error('Failed to generate or save QR code');
    }
  }

  async create(createTableDto: CreateTableDto) {
    const { restaurant_id } = createTableDto;
    const restaurant = await this.restaurantModel.findById(restaurant_id);
    if (!restaurant) {
      throw new BadRequestException('No such table');
    }
    const newTable = await this.tablesModel.create(createTableDto);

    const baseUrl = `${process.env.API_URL}:${process.env.PORT}/api/menu`;
    const link = `${baseUrl}/${restaurant._id}/${newTable._id}`;
    await this.generateQRCodeFile(link, String(newTable._id));
    newTable.qr_code = link;
    await newTable.save();
    restaurant.tables.push(newTable);
    await restaurant.save();

    return newTable;
  }

  findAll() {
    return this.tablesModel
      .find()
      .populate('restaurant_id')
      .populate('reservations');
  }

  findOne(id: string) {
    return this.tablesModel.findById(id);
  }

  update(id: string, updateTableDto: UpdateTableDto) {
    return this.tablesModel.findByIdAndUpdate(id, updateTableDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.tablesModel.findByIdAndDelete(id);
  }
}
