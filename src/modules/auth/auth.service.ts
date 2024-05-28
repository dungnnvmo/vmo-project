import ms from 'ms';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import AuthCreadentialsDto from './dto/auth-credentials.dto';
import TokenResponse from './dto/token-response.dto';
import { jwtConfig } from '@configs/configs.constants';
import { JwtService } from '@nestjs/jwt';
import TokenResponseDto from './dto/token-response.dto copy';
import JwtPayload from './payloads/jwt-pauload';
import { AuthMessage } from './auth.constants';
import AuthEmailLoginDto from './dto/auth-email-login.dto';
import { UpdateUserDto } from '@users/dto/update-user.dto';
import { User } from '@users/entities/user.entity';
import { AuthResetPasswordDto } from './dto/auth-reset-password.dto';
import * as bcrypt from 'bcrypt';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly uploadService: UploadService,
  ) {}

  private getTokenData(payload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: jwtConfig.secret,
      expiresIn: jwtConfig.expiresIn,
    });
  }

  /**
   * Sign up an user.
   * @param authCredentialsDto AuthCredentialDto.
   */
  async signUp(
    authCredentialsDto: AuthCreadentialsDto,
  ): Promise<TokenResponseDto> {
    await this.userService.create(authCredentialsDto);
    const payload: JwtPayload = {};
    const jwtAccessToken = await this.getTokenData(payload);
    return { jwtAccessToken };
  }

  /**
   * Sign in an user.
   * @param loginDto AuthEmailLoginDt.
   */
  async signIn(loginDto: AuthEmailLoginDto): Promise<TokenResponseDto> {
    const { email, password } = loginDto;
    const user = await this.userService.findOne({ where: { email } });

    // If user with email exist and the password is valid.
    if (user && (await user.validatePassword(password))) {
      const payload: JwtPayload = { id: user.id };
      const jwtAccessToken = await this.getTokenData(payload);

      return { jwtAccessToken };
    }
    // Else return an error.
    throw new BadRequestException(AuthMessage.INVALID_CREDENTIALS);
  }

  async me(id: User['id']) {
    return this.userService.findOne({
      where: {
        id,
      },
    });
  }

  async resetPassword(id: User['id'], resetPasswordDto: AuthResetPasswordDto) {
    const user = await this.userService.findOne({ where: { id } });
    if (user && (await user.validatePassword(resetPasswordDto.oldPassword))) {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(
        resetPasswordDto.newPassword,
        salt,
      );
      user.salt = salt;
      user.password = hashPassword;
      return user.save();
    }
    throw new BadRequestException(AuthMessage.INVALID_CREDENTIALS);
  }

  update(id: User['id'], userDto: UpdateUserDto) {
    console.log(userDto);
    return this.userService.update(id, userDto);
  }

  async uploadAvatar(id: User['id'], file: Express.Multer.File) {
    const fileUrl = await this.uploadService.uploadFile(file);
    return this.userService.update(id, { avatar: fileUrl });
  }
}
