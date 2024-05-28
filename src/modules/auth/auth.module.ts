import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStategy } from './strategies/jwt.stategies';
import { RoleModuleModule } from '@role-module/role-module.module';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    UsersModule,
    UploadModule,
    RoleModuleModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
