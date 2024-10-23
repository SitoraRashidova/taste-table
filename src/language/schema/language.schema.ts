// language.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type LanguageDocument = HydratedDocument<Language>;

@Schema({ versionKey: false })
export class Language {
  @ApiProperty({
    description: 'The unique code of the language (e.g., "en" for English)',
    example: 'en',
  })
  @Prop({ unique: true })
  code: string;

  @ApiProperty({
    description: 'The unique name of the language (e.g., "English")',
    example: 'English',
  })
  @Prop({ unique: true })
  name: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
