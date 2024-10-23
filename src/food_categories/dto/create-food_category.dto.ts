
import { ApiProperty } from '@nestjs/swagger';

export class CreateFoodCategoryDto {
  @ApiProperty({
    description: 'The ID of the restaurant to which this food category belongs',
    example: 1,
  })
  restaurant_id: number;

  @ApiProperty({
    description: 'The name of the food category',
    example: 'Appetizers',
  })
  name: string;

  @ApiProperty({
    description: 'A brief description of the food category',
    example: 'A selection of starter dishes',
    required: false,
  })
  description: string;
}
