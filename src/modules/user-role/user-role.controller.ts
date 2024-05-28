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
import { UserRoleService } from './user-role.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SetAction } from '@common/decorators/action.decorators';
import { Action } from '@role/role.enum';
import { CanDoGuard } from '@role/guards/roles.guard';
import { SetModule } from '@common/decorators/module.decorators';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User-role')
@Controller('user-role')
@UseGuards(AuthGuard('jwt'), CanDoGuard)
@SetModule('user-role')
@ApiBearerAuth()
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @SetAction(Action.Add)
  @Post()
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRoleService.create(createUserRoleDto);
  }

  @SetAction(Action.Read)
  @Get()
  findAll() {
    return this.userRoleService.findAll();
  }
  @SetAction(Action.Edit)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.userRoleService.update(id, updateUserRoleDto);
  }

  @SetAction(Action.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRoleService.remove(id);
  }
}
