import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserRoleDto {
  @ApiProperty({ example: 'example role id' })
  @IsString()
  roleId: string;

  @ApiProperty({ example: 'example user id' })
  @IsString()
  userId: string;
}
