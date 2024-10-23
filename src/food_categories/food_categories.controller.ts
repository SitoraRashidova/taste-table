import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FoodCategoriesService } from './food_categories.service';
import { CreateFoodCategoryDto } from './dto/create-food_category.dto';
import { UpdateFoodCategoryDto } from './dto/update-food_category.dto';

@ApiTags('food-categories') 
@Controller('food-categories')
export class FoodCategoriesController {
  constructor(private readonly foodCategoriesService: FoodCategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new food category' })
  @ApiResponse({
    status: 201,
    description: 'The food category has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createFoodCategoryDto: CreateFoodCategoryDto) {
    return this.foodCategoriesService.create(createFoodCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all food categories' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all food categories.',
  })
  findAll() {
    return this.foodCategoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific food category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the requested food category.',
  })
  @ApiResponse({ status: 404, description: 'Food category not found.' })
  findOne(@Param('id') id: string) {
    return this.foodCategoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update specific fields of a food category by ID' })
  @ApiResponse({
    status: 200,
    description: 'The food category has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Food category not found.' })
  update(
    @Param('id') id: string,
    @Body() updateFoodCategoryDto: UpdateFoodCategoryDto,
  ) {
    return this.foodCategoriesService.update(id, updateFoodCategoryDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Replace a food category by ID' })
  @ApiResponse({
    status: 200,
    description: 'The food category has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Food category not found.' })
  updateByLangId(
    @Param('id') id: string,
    @Body() updateFoodCategoryDto: UpdateFoodCategoryDto,
  ) {
    return this.foodCategoriesService.updateByLangID(id, updateFoodCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a food category by ID' })
  @ApiResponse({
    status: 200,
    description: 'The food category has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Food category not found.' })
  remove(@Param('id') id: string) {
    return this.foodCategoriesService.remove(id);
  }
}
