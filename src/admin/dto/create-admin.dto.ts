import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({
    description: 'Full name of the admin',
    example: 'Nodira Yoldashova',
  })
  full_name: string;

  @ApiProperty({
    description: 'Email address of the admin',
    example: 'nodira88@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Phone number of the admin',
    example: '+9989123456789',
  })
  phone_number: string;

  @ApiProperty({
    description: 'Telegram link of the admin',
    example: 'https://t.me/Nodira88',
  })
  tg_link: string;

  @ApiProperty({
    description: 'Password for the admin account',
    example: 'Nodira88',
  })
  password: string;

  @ApiProperty({
    description: 'Confirmation of the password',
    example: 'Nodira88',
  })
  confirm_password: string;

  @ApiProperty({
    description: 'Description about the admin',
    example: 'Nodira admin',
  })
  description: string;
}

