import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import AuthCreadentialsDto from './dto/auth-credentials.dto';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

import { AuthDescription, AuthSummary } from './auth.constants';
import { CommonDescription } from 'src/common/constants/descriptions.constants';
import TokenResponseDto from './dto/token-response.dto';
import { ErrorResponse } from 'src/common/dto/response.dto';
import AuthEmailLoginDto from './dto/auth-email-login.dto';
import { UpdateUserDto } from '@users/dto/update-user.dto';
import { CanDoGuard } from '@role/guards/roles.guard';
import { SetAction } from '@common/decorators/action.decorators';
import { SetModule } from '@common/decorators/module.decorators';
import { Action } from '@role/role.enum';
import { AuthResetPasswordDto } from './dto/auth-reset-password.dto';
import { User } from '@users/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@SetModule('auth')
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: AuthSummary.SIGN_UP_SUMMARY })
  @ApiBody({ type: AuthCreadentialsDto })
  @ApiCreatedResponse({
    description: AuthDescription.SIGN_UP_SUCCESS,
    type: TokenResponseDto,
  })
  @ApiConflictResponse({
    description: AuthDescription.EMAIL_EXIST,
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: CommonDescription.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
  })
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCreadentialsDto,
  ): Promise<TokenResponseDto> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: AuthSummary.SIGN_IN_SUMMARY })
  @ApiBody({ type: AuthEmailLoginDto })
  @ApiOkResponse({
    description: AuthDescription.SIGN_IN_SUCCESS,
    type: TokenResponseDto,
  })
  @ApiBadRequestResponse({
    description: AuthDescription.INVALID_CREDENTIALS,
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: CommonDescription.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
  })
  async signIn(
    @Body(ValidationPipe) loginDto: AuthEmailLoginDto,
  ): Promise<TokenResponseDto> {
    return this.authService.signIn(loginDto);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), CanDoGuard)
  @SetAction(Action.Read)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: AuthSummary.GET_USER_INFO })
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
  me(@Request() req) {
    return this.authService.me(req.user.id);
  }

  @Patch('reset/password')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: AuthResetPasswordDto })
  @UseGuards(AuthGuard('jwt'), CanDoGuard)
  @SetAction(Action.Edit)
  @ApiOperation({ summary: AuthSummary.RESET_PASSWORD })
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
  resetPassword(@Request() req, @Body() updateUserDto: AuthResetPasswordDto) {
    return this.authService.resetPassword(req.user.id, updateUserDto);
  }

  @Patch('me')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UpdateUserDto })
  @UseGuards(AuthGuard('jwt'), CanDoGuard)
  @SetAction(Action.Edit)
  @ApiOperation({ summary: AuthSummary.CHANGE_USER_INFO })
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
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(req.user.id, updateUserDto);
  }

  @Patch('me/avatar')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'), CanDoGuard)
  @SetAction(Action.Edit)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: AuthSummary.CHANGE_AVATAR })
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
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.authService.uploadAvatar(req.user.id, file);
  }
}
