import { PartialType } from '@nestjs/swagger';
import { CreateUserFormDto } from './create-user-form.dto';
import { UpdateUserFormDetailDto } from '@user-form-detail/dto/update-user-form-detail.dto';

export class UpdateUserFormDto extends PartialType(CreateUserFormDto) {
  userFormDetailDto?: UpdateUserFormDetailDto;
}
