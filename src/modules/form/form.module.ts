import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { FormRepository } from './form.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { UserFormModule } from '@user-form/user-form.module';
import { FormDetailModule } from '@form-detail/form-detail.module';
import { RoleModuleModule } from '@role-module/role-module.module';
import { NotificationModule } from '@notification/notification.module';

@Module({
  imports: [
    FormDetailModule,
    NotificationModule,
    RoleModuleModule,
    UserFormModule,
    TypeOrmModule.forFeature([Form]),
  ],
  controllers: [FormController],
  providers: [FormService, FormRepository],
  exports: [FormService],
})
export class FormModule {}
