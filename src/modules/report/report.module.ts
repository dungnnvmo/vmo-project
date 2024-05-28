import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { UserFormModule } from '@user-form/user-form.module';
import { UsersModule } from '@users/users.module';
import { FormDetailModule } from '@form-detail/form-detail.module';
import { RoleModuleModule } from '@role-module/role-module.module';

@Module({
  imports: [UserFormModule, UsersModule, FormDetailModule, RoleModuleModule],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
