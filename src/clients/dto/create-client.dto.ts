import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ description: 'The name of the client' })
  name: string;

  @ApiProperty({ description: 'The email of the client' })
  email: string;

  @ApiProperty({ description: 'The password for the client account' })
  password: string;

  @ApiProperty({ description: 'Confirmation of the client password' })
  confirm_password: string;

  @ApiProperty({
    description: 'Indicates if the client is active',
    default: true,
  })
  is_active: boolean;
}
