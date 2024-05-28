import { PartialType } from '@nestjs/swagger';
import { CreateUserFormDetailDto } from './create-user-form-detail.dto';

export class UpdateUserFormDetailDto extends PartialType(
  CreateUserFormDetailDto,
) {}
