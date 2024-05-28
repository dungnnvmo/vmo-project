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
  Req,
  BadRequestException,
  HttpStatus,
  HttpCode,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FormType } from './form.enum';
import { CommonDescription } from '@common/constants/descriptions.constants';
import { ErrorResponse } from '@common/dto/response.dto';
import { Form } from './entities/form.entity';
import { SetModule } from '@common/decorators/module.decorators';
import { SetAction } from '@common/decorators/action.decorators';
import { Action } from '@role/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { CanDoGuard } from '@role/guards/roles.guard';
import { FormSummary } from './form.constants';

@ApiBearerAuth()
@ApiTags('Form')
@UseGuards(AuthGuard('jwt'), CanDoGuard)
@Controller('form')
@SetModule('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @SetAction(Action.Add)
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: FormSummary.CREATE_FORM })
  @ApiOkResponse({
    description: CommonDescription.CREATE_ITEM_SUCCESS,
    type: Form,
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
  @ApiBody({ type: CreateFormDto })
  create(@Body() createFormDto: CreateFormDto) {
    return this.formService.create(createFormDto);
  }

  @SetAction(Action.Read)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: FormSummary.GET_BY_ID })
  @ApiOkResponse({
    description: CommonDescription.GET_ITEM_SUCCESS,
    type: Form,
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
  getFormByID(@Param('id') id: string) {
    return this.formService.findOne({
      where: {
        id,
      },
      relations: ['formDetails'],
    });
  }

  @SetAction(Action.Read)
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: FormSummary.GET_ALL })
  @ApiOkResponse({
    description: CommonDescription.GET_ITEM_SUCCESS,
    type: Form,
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
  @Get('')
  getAllForm(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ) {
    return this.formService.pagination({
      limit,
      page,
    });
  }

  @SetAction(Action.Read)
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: FormSummary.GET_BY_TYPE })
  @ApiOkResponse({
    description: CommonDescription.GET_ITEM_SUCCESS,
    type: Form,
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
  @Get('/type/:type')
  getAllByType(
    @Param('type') type: FormType,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ) {
    return this.formService.getByType(
      {
        limit,
        page,
      },
      type,
    );
  }

  @Patch(':id')
  @SetAction(Action.Edit)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: FormSummary.UPDATE_BY_ID })
  @ApiBody({ type: UpdateFormDto })
  @ApiOkResponse({
    description: CommonDescription.UPDATE_ITEM_SUCESS,
    type: Form,
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
  update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formService.update(id, updateFormDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: FormSummary.DELETE_BY_ID })
  @ApiOkResponse({
    description: CommonDescription.DELETE_ITEM_SUCCESS,
    type: Form,
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
  @SetAction(Action.Delete)
  remove(@Param('id') id: string) {
    return this.formService.remove({ id });
  }
}
