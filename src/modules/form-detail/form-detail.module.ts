import { Module } from '@nestjs/common';
import { FormDetailService } from './form-detail.service';
import { FormDetailController } from './form-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormDetail } from './entities/form-detail.entity';
import { FormDetailRepository } from './form-detail.repository';
import { RoleModuleModule } from '@role-module/role-module.module';

@Module({
  imports: [TypeOrmModule.forFeature([FormDetail]), RoleModuleModule],
  controllers: [FormDetailController],
  providers: [FormDetailService, FormDetailRepository],
  exports: [FormDetailService],
})
export class FormDetailModule {}
