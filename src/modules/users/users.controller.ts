import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
  NotFoundException,
  HttpStatus,
  HttpCode,
  HttpException,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CommonDescription } from '@common/constants/descriptions.constants';
import { UsersSummary } from './user.constants';
import { User } from './entities/user.entity';
import { ErrorResponse } from '@common/dto/response.dto';
import { CanDoGuard } from '@role/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Action } from '@role/role.enum';
import { SetAction } from '@common/decorators/action.decorators';
import { SetModule } from '@common/decorators/module.decorators';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), CanDoGuard)
@SetModule('user')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @SetAction(Action.Add)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: UsersSummary.CREATE_USER })
  @ApiOkResponse({
    description: CommonDescription.CREATE_ITEM_SUCCESS,
    type: User,
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
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SetAction(Action.Read)
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOperation({ summary: UsersSummary.GET_BY_ID })
  @ApiOkResponse({
    description: CommonDescription.GET_ITEM_SUCCESS,
    type: User,
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
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Cannot find user with id ${id}`);
    }
    return user;
  }

  @Patch(':id')
  @SetAction(Action.Edit)
  @ApiParam({ name: 'id', type: 'string' })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: UsersSummary.UPDATE_BY_ID })
  @ApiOkResponse({
    description: CommonDescription.UPDATE_ITEM_SUCESS,
    type: User,
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @SetAction(Action.Delete)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', type: 'string' })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: UsersSummary.DELETE_BY_ID })
  @ApiOkResponse({
    description: CommonDescription.DELETE_ITEM_SUCCESS,
    type: User,
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
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
