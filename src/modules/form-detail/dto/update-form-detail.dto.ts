import { PartialType } from '@nestjs/swagger';
import { CreateFormDetailDto } from './create-form-detail.dto';

export class UpdateFormDetailDto extends PartialType(CreateFormDetailDto) {}
