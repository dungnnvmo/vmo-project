import { Module } from '@nestjs/common';
import { UserFormService } from './user-form.service';
import { UserFormController } from './user-form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserForm } from './entities/user-form.entity';
import { UserFormRepository } from './user-form.repository';
import { RoleModuleModule } from '@role-module/role-module.module';
import { UserFormDetailModule } from '@user-form-detail/user-form-detail.module';
import { RoleModule } from '@role/role.module';
import { UsersModule } from '@users/users.module';
import { NotificationModule } from '@notification/notification.module';
import { FormModule } from '@form/form.module';
import { UserRoleModule } from '@user-role/user-role.module';

@Module({
  imports: [
    UserFormDetailModule,
    RoleModuleModule,
    UsersModule,
    RoleModule,
    NotificationModule,
    UserRoleModule,
    UserRoleModule,
    TypeOrmModule.forFeature([UserForm]),
  ],
  controllers: [UserFormController],
  providers: [UserFormService, UserFormRepository],
  exports: [UserFormService],
})
export class UserFormModule {}
