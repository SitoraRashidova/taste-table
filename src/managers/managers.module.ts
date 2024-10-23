import { Module } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Manager, ManagerSchema } from './schemas/manager.schema';
import { JwtModule } from '@nestjs/jwt';
import {
  Restaurant,
  RestaurantSchema,
} from '../restoran/schemas/restoran.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Manager.name,
        schema: ManagerSchema,
      },
      {
        name: Restaurant.name,
        schema: RestaurantSchema,
      },
    ]),
    JwtModule.register({}),
  ],
  controllers: [ManagersController],
  providers: [ManagersService],
})
export class ManagersModule {}
