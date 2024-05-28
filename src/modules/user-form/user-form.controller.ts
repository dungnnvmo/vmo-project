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
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UserFormService } from './user-form.service';
import { CreateUserFormDto } from './dto/create-user-form.dto';
import { UpdateUserFormDto } from './dto/update-user-form.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SetModule } from '@common/decorators/module.decorators';
import { SetAction } from '@common/decorators/action.decorators';
import { Action } from '@role/role.enum';
import { CanDoGuard } from '@role/guards/roles.guard';
import { FormStatus, FormType } from '@form/form.enum';
import { UserFormSummary } from './user-form.constants';
import { ErrorResponse } from '@common/dto/response.dto';
import { UserForm } from './entities/user-form.entity';
import { CommonDescription } from '@common/constants/descriptions.constants';

@ApiTags('User-form')
@Controller('user-form')
@UseGuards(AuthGuard('jwt'), CanDoGuard)
@ApiBearerAuth()
export class UserFormController {
  constructor(private readonly userFormService: UserFormService) {}

  @SetModule('user-form')
  @Get('/type/:type')
  @SetAction(Action.Read)
  @ApiOperation({ summary: UserFormSummary.GET_BY_TYPE })
  @ApiOkResponse({
    description: CommonDescription.GET_ITEM_SUCCESS,
    type: UserForm,
  })
  @ApiBadRequestResponse({
    description: CommonDescription.BAD_REQUEST,
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: CommonDescription.UNAUTHORIZED,
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: CommonDescription.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
  })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  findAllByType(
    @Request() req,
    @Param('type') type: FormType,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ) {
    return this.userFormService.findAll(
      req.user.id,
      {
        limit,
        page,
      },
      type,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: UserFormSummary.GET_BY_ID })
  @SetModule('user-form')
  @SetAction(Action.Read)
  @ApiOkResponse({
    description: CommonDescription.GET_ITEM_SUCCESS,
    type: UserForm,
  })
  @ApiBadRequestResponse({
    description: CommonDescription.BAD_REQUEST,
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: CommonDescription.UNAUTHORIZED,
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: CommonDescription.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
  })
  findOne(@Request() req, @Param('id') id: string) {
    const userId = req.user.id;
    return this.userFormService.getById(id, userId);
  }

  @Get('')
  @SetModule('user-form')
  @SetAction(Action.Read)
  @ApiOperation({ summary: UserFormSummary.GET_ALL })
  @ApiOkResponse({
    description: CommonDescription.GET_ITEM_SUCCESS,
    type: UserForm,
  })
  @ApiBadRequestResponse({
    description: CommonDescription.BAD_REQUEST,
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: CommonDescription.UNAUTHORIZED,
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: CommonDescription.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
  })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  findAll(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ) {
    return this.userFormService.findAll(req.user.id, {
      limit,
      page,
    });
  }

  @Patch('/:id/submit')
  @SetModule('user-form')
  @SetAction(Action.Edit)
  @ApiOperation({ summary: UserFormSummary.SUBMIT_FORM })
  @SetModule('user-form')
  @ApiOkResponse({
    description: CommonDescription.UPDATE_ITEM_SUCESS,
    type: UserForm,
  })
  @ApiBadRequestResponse({
    description: CommonDescription.BAD_REQUEST,
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: CommonDescription.UNAUTHORIZED,
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: CommonDescription.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
  })
  submitForm(@Param('id') id: string, @Request() req) {
    return this.userFormService.submitForm(id, {
      employeeId: req.user.id,
      status: FormStatus.PENDING_APPROVAL,
    });
  }

  @SetModule('user-form')
  @SetAction(Action.Approved)
  @Patch('/:id/approve')
  @ApiOperation({ summary: UserFormSummary.APPROVE_FORM })
  @SetModule('user-form')
  @ApiOkResponse({
    description: CommonDescription.UPDATE_ITEM_SUCESS,
    type: UserForm,
  })
  @ApiBadRequestResponse({
    description: CommonDescription.BAD_REQUEST,
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: CommonDescription.UNAUTHORIZED,
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: CommonDescription.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
  })
  approveForm(
    @Param('id') id: string,
    @Body() updateUserFormDto: UpdateUserFormDto,
  ) {
    return this.userFormService.update(id, {
      userFormDetailDto: updateUserFormDto,
      status: FormStatus.APPROVED,
    });
  }

  @SetModule('user-form-close')
  @SetAction(Action.Approved)
  @Patch('/:id/close')
  @ApiOperation({ summary: UserFormSummary.CLOSE_FORM })
  @SetAction(Action.Read)
  @ApiOkResponse({
    description: CommonDescription.UPDATE_ITEM_SUCESS,
    type: UserForm,
  })
  @ApiBadRequestResponse({
    description: CommonDescription.BAD_REQUEST,
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: CommonDescription.UNAUTHORIZED,
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: CommonDescription.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
  })
  closeForm(@Param('id') id: string) {
    return this.userFormService.update(id, {
      status: FormStatus.CLOSED,
    });
  }

  @SetModule('user-form')
  @SetAction(Action.Edit)
  @Patch('/:id')
  @ApiOperation({ summary: UserFormSummary.APPROVE_FORM })
  @SetModule('user-form')
  @SetAction(Action.Read)
  @ApiOkResponse({
    description: CommonDescription.UPDATE_ITEM_SUCESS,
    type: UserForm,
  })
  @ApiBadRequestResponse({
    description: CommonDescription.BAD_REQUEST,
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: CommonDescription.UNAUTHORIZED,
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: CommonDescription.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
  })
  update(
    @Param('id') id: string,
    @Body() updateUserFormDto: UpdateUserFormDto,
  ) {
    return this.userFormService.update(id, {
      ...updateUserFormDto,
    });
  }

  @SetModule('user-form')
  @SetAction(Action.Delete)
  @Delete(':id')
  @ApiOperation({ summary: UserFormSummary.DELETE_BY_ID })
  @SetAction(Action.Read)
  @ApiOkResponse({
    description: CommonDescription.DELETE_ITEM_SUCCESS,
    type: UserForm,
  })
  @ApiBadRequestResponse({
    description: CommonDescription.BAD_REQUEST,
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: CommonDescription.UNAUTHORIZED,
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: CommonDescription.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
  })
  delete(@Param('id') id: string) {
    return this.userFormService.remove({
      id,
    });
  }
}
