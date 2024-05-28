import { FormStatus, FormType } from '@form/form.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserFormDto {
  @IsOptional()
  @IsString()
  type?: FormType;

  @IsOptional()
  @IsString()
  status?: FormStatus;

  @IsOptional()
  userId?: string;

  @ApiProperty({ example: 'Example form id' })
  @IsNotEmpty()
  formId: string;

  userIds?: string[];

  @IsOptional()
  employeeId?: string;
}
