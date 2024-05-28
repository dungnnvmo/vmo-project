import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CanDoGuard } from './guards/roles.guard';
import { SetModule } from '@common/decorators/module.decorators';
import { SetAction } from '@common/decorators/action.decorators';
import { Action } from './role.enum';

@ApiTags('Role')
@UseGuards(AuthGuard('jwt'), CanDoGuard)
@Controller('role')
@SetModule('role')
@ApiBearerAuth()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('')
  @SetAction(Action.Read)
  getUserRole(@Request() req) {
    return this.roleService.getUserRole(req.user.id);
  }
}
