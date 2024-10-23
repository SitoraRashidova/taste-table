// create-language.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateLanguageDto {
  @ApiProperty({
    description: 'The code of the language (e.g., "en" for English)',
    example: 'en',
  })
  code: string;

  @ApiProperty({
    description: 'The name of the language (e.g., "English")',
    example: 'English',
  })
  name: string;

  @ApiProperty({
    description: 'The ID of the language, typically a unique identifier',
    example: '64b8f2f03a1fbb12cfc9efc3',
  })
  lang_id: string;
}
