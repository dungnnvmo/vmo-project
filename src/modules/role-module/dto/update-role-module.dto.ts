import { PartialType } from '@nestjs/swagger';
import { CreateRoleModuleDto } from './create-role-module.dto';

export class UpdateRoleModuleDto extends PartialType(CreateRoleModuleDto) {}
