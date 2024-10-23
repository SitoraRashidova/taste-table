import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('tables') // Group the API under 'tables'
@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new table' })
  @ApiResponse({
    status: 201,
    description: 'The table has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createTableDto: CreateTableDto) {
    return this.tablesService.create(createTableDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tables' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all tables.',
  })
  findAll() {
    return this.tablesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific table by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the table.',
  })
  @ApiResponse({ status: 404, description: 'Table not found.' })
  findOne(@Param('id') id: string) {
    return this.tablesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific table by ID' })
  @ApiResponse({
    status: 200,
    description: 'The table has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Table not found.' })
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tablesService.update(id, updateTableDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific table by ID' })
  @ApiResponse({
    status: 200,
    description: 'The table has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Table not found.' })
  remove(@Param('id') id: string) {
    return this.tablesService.remove(id);
  }
}
