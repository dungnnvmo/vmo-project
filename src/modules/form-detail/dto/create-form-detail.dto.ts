import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateFormDetailDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  ratingPoint: number;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  formId: string;

  @IsNotEmpty()
  @IsOptional()
  @IsUUID()
  managerId: string;

  @IsNotEmpty()
  @IsOptional()
  @IsUUID()
  employeeId: string;

  @IsNotEmpty()
  @IsOptional()
  @IsUUID()
  directorId: string;
}
