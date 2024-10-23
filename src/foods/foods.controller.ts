// foods.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@ApiTags('foods') // Group all endpoints under 'Foods' in Swagger UI
@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new food item' })
  @ApiResponse({
    status: 201,
    description: 'The food item has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodsService.create(createFoodDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all food items' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all food items.',
  })
  findAll() {
    return this.foodsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific food item by ID' })
  @ApiResponse({ status: 200, description: 'Returns the requested food item.' })
  @ApiResponse({ status: 404, description: 'Food item not found.' })
  findOne(@Param('id') id: string) {
    return this.foodsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific food item by ID' })
  @ApiResponse({
    status: 200,
    description: 'The food item has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Food item not found.' })
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodsService.update(id, updateFoodDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific food item by ID' })
  @ApiResponse({
    status: 200,
    description: 'The food item has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Food item not found.' })
  remove(@Param('id') id: string) {
    return this.foodsService.remove(id);
  }
}
