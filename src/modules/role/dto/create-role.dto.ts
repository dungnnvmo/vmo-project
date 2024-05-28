import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@role/role.enum';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @Length(3, 50)
  @ApiProperty({ example: 'Example role name' })
  name: Roles;
}
