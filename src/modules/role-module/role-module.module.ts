import { Module } from '@nestjs/common';
import { RoleModuleService } from './role-module.service';
import { RoleModuleController } from './role-module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModuleEntity } from './entities/role-module.entity';
import { RoleModuleRepository } from './role-module.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleModuleEntity])],
  controllers: [RoleModuleController],
  providers: [RoleModuleService, RoleModuleRepository],
  exports: [RoleModuleService],
})
export class RoleModuleModule {}
