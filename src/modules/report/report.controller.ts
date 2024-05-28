import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { FormType } from '@form/form.enum';
import { SetAction } from '@common/decorators/action.decorators';
import { Action } from '@role/role.enum';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SetModule } from '@common/decorators/module.decorators';
import { CanDoGuard } from '@role/guards/roles.guard';

@ApiBearerAuth()
@ApiTags('Report')
@UseGuards(AuthGuard('jwt'), CanDoGuard)
@SetModule('report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('status')
  @SetAction(Action.Read)
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  getStatus(
    @Query('formType') formType: FormType,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ) {
    return this.reportService.getStatus(
      {
        limit,
        page,
      },
      formType,
    );
  }

  @Get('/')
  @SetAction(Action.Read)
  reportCompletion(@Query('formType') formType: FormType) {
    return this.reportService.reportFormCompletion(formType);
  }
}
