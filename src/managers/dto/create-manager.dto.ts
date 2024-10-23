import { ApiProperty } from '@nestjs/swagger';

export class CreateManagerDto {
  @ApiProperty({
    description: 'The unique ID of the restaurant where the manager works',
    example: '64b8f2f03a1fbb12cfc9efc3',
  })
  restaurant_id: string;

  @ApiProperty({
    description: 'The full name of the manager',
    example: 'John Doe',
  })
  full_name: string;

  @ApiProperty({
    description: 'The email address of the manager',
    example: 'johndoe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password for the manager account',
    example: 'securepassword123',
  })
  password: string;

  @ApiProperty({
    description: 'Confirmation of the manager account password',
    example: 'securepassword123',
  })
  confirm_password: string;

  @ApiProperty({
    description: 'Indicates whether the manager account is active or not',
    example: true,
  })
  is_active: boolean;
}
