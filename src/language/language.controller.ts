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
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';

@ApiTags('language') // Group all endpoints under 'Language' in Swagger UI
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new language' })
  @ApiResponse({
    status: 201,
    description: 'The language has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languageService.create(createLanguageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all languages' })
  @ApiResponse({ status: 200, description: 'Returns a list of all languages.' })
  findAll() {
    return this.languageService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific language by ID' })
  @ApiResponse({ status: 200, description: 'Returns the requested language.' })
  @ApiResponse({ status: 404, description: 'Language not found.' })
  findOne(@Param('id') id: string) {
    return this.languageService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific language by ID' })
  @ApiResponse({
    status: 200,
    description: 'The language has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Language not found.' })
  update(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ) {
    return this.languageService.update(+id, updateLanguageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific language by ID' })
  @ApiResponse({
    status: 200,
    description: 'The language has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Language not found.' })
  remove(@Param('id') id: string) {
    return this.languageService.remove(+id);
  }
}
