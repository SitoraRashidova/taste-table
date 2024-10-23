import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { RestoranModule } from './restoran/restoran.module';
import { TablesModule } from './tables/tables.module';
import { ManagersModule } from './managers/managers.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ClientsModule } from './clients/clients.module';
import { FoodCategoriesModule } from './food_categories/food_categories.module';
import { FoodsModule } from './foods/foods.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LanguageModule } from './language/language.module';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    // mongodb://localhost:27017/taste-table
    MongooseModule.forRoot(`mongodb://${process.env.API_HOST}:27017/taste-table`),
    AdminModule,
    RestoranModule,
    TablesModule,
    ManagersModule,
    ReservationsModule,
    ClientsModule,
    FoodCategoriesModule,
    FoodsModule,
    LanguageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
