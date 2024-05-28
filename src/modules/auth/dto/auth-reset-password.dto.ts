import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthResetPasswordDto {
  @ApiProperty({ example: 'secret' })
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ example: 'secret1' })
  @IsNotEmpty()
  newPassword: string;
}
