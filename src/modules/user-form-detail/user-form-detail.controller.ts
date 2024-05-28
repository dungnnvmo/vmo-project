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
import { UserFormDetailService } from './user-form-detail.service';
import { CreateUserFormDetailDto } from './dto/create-user-form-detail.dto';
import { UpdateUserFormDetailDto } from './dto/update-user-form-detail.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CanDoGuard } from '@role/guards/roles.guard';
import { SetModule } from '@common/decorators/module.decorators';
import { SetAction } from '@common/decorators/action.decorators';
import { Action } from '@role/role.enum';

@ApiTags('User-form-detail')
@Controller('user-form-detail')
@UseGuards(AuthGuard('jwt'), CanDoGuard)
@SetModule('user-form-detail')
@ApiBearerAuth()
export class UserFormDetailController {
  constructor(private readonly userFormDetailService: UserFormDetailService) {}

  @SetAction(Action.Edit)
  @Post()
  create(@Body() createUserFormDetailDto: CreateUserFormDetailDto) {
    return this.userFormDetailService.create(createUserFormDetailDto);
  }

  @SetAction(Action.Read)
  @Get()
  findAll() {
    return this.userFormDetailService.findAll({});
  }

  @SetAction(Action.Read)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userFormDetailService.findOne({
      where: {
        userFormId: id,
      },
    });
  }

  @SetAction(Action.Edit)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserFormDetailDto: UpdateUserFormDetailDto,
  ) {
    return this.userFormDetailService.update(id, updateUserFormDetailDto);
  }

  @SetAction(Action.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userFormDetailService.remove({ id });
  }
}
