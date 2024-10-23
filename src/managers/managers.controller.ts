import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ManagersService } from './managers.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('managers') // Tag for the API documentation
@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new manager' })
  @ApiResponse({
    status: 201,
    description: 'The manager has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managersService.create(createManagerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all managers' })
  @ApiResponse({ status: 200, description: 'List of managers' })
  findAll() {
    return this.managersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a manager by ID' })
  @ApiResponse({
    status: 200,
    description: 'The manager has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'Manager not found' })
  findOne(@Param('id') id: string) {
    return this.managersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a manager by ID' })
  @ApiResponse({
    status: 200,
    description: 'The manager has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Manager not found' })
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managersService.update(id, updateManagerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a manager by ID' })
  @ApiResponse({
    status: 200,
    description: 'The manager has been successfully removed.',
  })
  @ApiResponse({ status: 404, description: 'Manager not found' })
  remove(@Param('id') id: string) {
    return this.managersService.remove(id);
  }
}
