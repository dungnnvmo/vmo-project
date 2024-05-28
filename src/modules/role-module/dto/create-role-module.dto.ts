import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class CreateRoleModuleDto {
  @ApiProperty({ example: 'example role id' })
  @IsUUID()
  roleId: string;

  @ApiProperty({ example: 'example role module' })
  @IsString()
  module: string;

  @ApiProperty({ example: 'false' })
  @IsBoolean()
  isCanRead: boolean;

  @ApiProperty({ example: 'false' })
  @IsBoolean()
  isCanAdd: boolean;

  @ApiProperty({ example: 'false' })
  @IsBoolean()
  isCanEdit: boolean;

  @ApiProperty({ example: 'false' })
  @IsBoolean()
  isCanDelete: boolean;

  @ApiProperty({ example: 'false' })
  @IsBoolean()
  isCanApproved: boolean;
}
