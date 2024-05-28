import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RoleModuleService } from './role-module.service';
import { CreateRoleModuleDto } from './dto/create-role-module.dto';
import { UpdateRoleModuleDto } from './dto/update-role-module.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Action } from '@role/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { CanDoGuard } from '@role/guards/roles.guard';
import { SetModule } from '@common/decorators/module.decorators';
import { SetAction } from '@common/decorators/action.decorators';

@ApiTags('Role-module')
@UseGuards(AuthGuard('jwt'), CanDoGuard)
@SetModule('role-module')
@Controller('role-module')
@ApiBearerAuth()
export class RoleModuleController {
  constructor(private readonly roleModuleService: RoleModuleService) {}

  @SetAction(Action.Add)
  @Post()
  create(@Body() createRoleModuleDto: CreateRoleModuleDto) {
    return this.roleModuleService.create(createRoleModuleDto);
  }

  @SetAction(Action.Edit)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleModuleDto: UpdateRoleModuleDto,
  ) {
    return this.roleModuleService.update(id, updateRoleModuleDto);
  }

  @SetAction(Action.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleModuleService.remove(id);
  }
}
