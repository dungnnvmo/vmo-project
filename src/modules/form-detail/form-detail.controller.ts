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
import { FormDetailService } from './form-detail.service';
import { CreateFormDetailDto } from './dto/create-form-detail.dto';
import { UpdateFormDetailDto } from './dto/update-form-detail.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CanDoGuard } from '@role/guards/roles.guard';
import { SetModule } from '@common/decorators/module.decorators';
import { SetAction } from '@common/decorators/action.decorators';
import { Action } from '@role/role.enum';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), CanDoGuard)
@Controller('form-detail')
@SetModule('form-detail')
@ApiTags('Form-detail')
export class FormDetailController {
  constructor(private readonly formDetailService: FormDetailService) {}

  @SetAction(Action.Add)
  @Post()
  create(@Body() createFormDetailDto: CreateFormDetailDto) {
    return this.formDetailService.create(createFormDetailDto);
  }

  @SetAction(Action.Edit)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFormDetailDto: UpdateFormDetailDto,
  ) {
    return this.formDetailService.update(id, updateFormDetailDto);
  }
}
