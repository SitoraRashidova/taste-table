import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RestoranService } from './restoran.service';
import { CreateRestoranDto } from './dto/create-restoran.dto';
import { UpdateRestoranDto } from './dto/update-restoran.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Restaurants') // Grouping the API endpoints under "Restaurants"
@Controller('restoran')
export class RestoranController {
  constructor(private readonly restoranService: RestoranService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new restaurant' })
  @ApiResponse({
    status: 201,
    description: 'The restaurant has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createRestoranDto: CreateRestoranDto) {
    return this.restoranService.create(createRestoranDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all restaurants' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of restaurants.',
  })
  findAll() {
    return this.restoranService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a restaurant by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the restaurant.',
  })
  @ApiResponse({ status: 404, description: 'Restaurant not found.' })
  findOne(@Param('id') id: string) {
    return this.restoranService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a restaurant by ID' })
  @ApiResponse({
    status: 200,
    description: 'The restaurant has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Restaurant not found.' })
  update(
    @Param('id') id: string,
    @Body() updateRestoranDto: UpdateRestoranDto,
  ) {
    return this.restoranService.update(+id, updateRestoranDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a restaurant by ID' })
  @ApiResponse({
    status: 200,
    description: 'The restaurant has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Restaurant not found.' })
  remove(@Param('id') id: string) {
    return this.restoranService.remove(+id);
  }
}
