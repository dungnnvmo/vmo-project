import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@role/role.enum';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class AuthCreadentialsDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'User email.',
    example: 'hr@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User password.',
    example: 'secret',
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Example first name.' })
  firstName: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Example last name.' })
  lastName: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  avatar: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Example citizen identity card.' })
  cic: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Example  social insurance number.' })
  sin: string;

  @IsOptional()
  address: string;

  @IsOptional()
  @ApiProperty({
    description: 'User roles.',
    example: ['User'],
  })
  roles: Roles[];

  @IsOptional()
  managerId: string;
}
