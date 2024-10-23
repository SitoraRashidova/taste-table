import { Module } from '@nestjs/common';
import { RestoranService } from './restoran.service';
import { RestoranController } from './restoran.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './schemas/restoran.schema';
import { Manager, ManagerSchema } from '../managers/schemas/manager.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Restaurant.name,
        schema: RestaurantSchema,
      }
    ]),
  ],
  controllers: [RestoranController],
  providers: [RestoranService],
})
export class RestoranModule {}
