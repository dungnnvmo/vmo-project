import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '@utils/transformers/lower-case.transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Example first name.' })
  firstName: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Example last name.' })
  lastName: string;

  @IsOptional()
  @ApiProperty({ example: 'Example phone.' })
  phone: string;

  @IsOptional()
  @ApiProperty({ example: 'Example url link.' })
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
  managerId: string;
}
