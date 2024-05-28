import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RoleModuleEntity } from './entities/role-module.entity';
import { Role } from '@role/entities/role.entity';

@Injectable()
export class RoleModuleRepository extends Repository<RoleModuleEntity> {
  constructor(private datasource: DataSource) {
    super(RoleModuleEntity, datasource.createEntityManager());
  }
}
