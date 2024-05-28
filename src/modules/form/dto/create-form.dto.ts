import { FormType } from '@form/form.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { FormDetail } from '@form-detail/entities/form-detail.entity';

export class CreateFormDto {
  @ApiProperty({ example: 'Example form type' })
  @IsNotEmpty()
  @IsString()
  type: FormType;

  @IsOptional()
  @ApiProperty({ type: () => FormDetail })
  formDetail?: FormDetail;

  @IsOptional()
  @ApiProperty({ example: [] })
  userId?: string[];
}
