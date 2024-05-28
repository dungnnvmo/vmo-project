import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserFormDetailDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsNumber()
  ratingPoint?: number;

  @IsNotEmpty()
  @IsString()
  userFormId: string;

  @IsOptional()
  @IsString()
  managerId?: string;

  @IsOptional()
  @IsString()
  employeeId?: string;

  @IsOptional()
  @IsString()
  directorId?: string;

  @IsOptional()
  @IsString()
  useId?: string;

  @IsOptional()
  @IsString()
  id?: string;
}
