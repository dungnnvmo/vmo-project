import { Module } from '@nestjs/common';
import { UserFormDetailService } from './user-form-detail.service';
import { UserFormDetailController } from './user-form-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFormDetail } from './entities/user-form-detail.entity';
import { UserFormDetailRepository } from './user-form-detail.repositosy';
import { RoleModuleModule } from '@role-module/role-module.module';

@Module({
  imports: [RoleModuleModule, TypeOrmModule.forFeature([UserFormDetail])],
  controllers: [UserFormDetailController],
  providers: [UserFormDetailService, UserFormDetailRepository],
  exports: [UserFormDetailService],
})
export class UserFormDetailModule {}
