
import { ApiProperty } from '@nestjs/swagger';

export class CreateFoodDto {
  @ApiProperty({
    description: 'The ID of the food category this food item belongs to',
    type: String,
    example: '64b8f2f03a1fbb12cfc9efc3',
  })
  food_category_id: string;

  @ApiProperty({
    description: 'The name of the food item',
    example: 'Cheeseburger',
  })
  name: string;

  @ApiProperty({
    description: 'A brief description of the food item',
    example:
      'A juicy cheeseburger with fresh lettuce, tomato, and cheddar cheese',
    required: false,
  })
  description: string;

  @ApiProperty({
    description: 'The price of the food item',
    type: Number,
    example: 8.99,
  })
  price: number;

  @ApiProperty({
    description: 'Indicates whether the food item is currently available',
    type: Boolean,
    example: true,
  })
  is_available: boolean;
}
