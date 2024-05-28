import { Injectable } from '@nestjs/common';
import { CreateRoleModuleDto } from './dto/create-role-module.dto';
import { UpdateRoleModuleDto } from './dto/update-role-module.dto';
import { RoleModuleRepository } from './role-module.repository';
import { RoleModuleEntity } from './entities/role-module.entity';
import { Role } from '@role/entities/role.entity';
import { PermissionResponseDto } from './dto/permission-response.dto';
import { UserRole } from '@user-role/entities/user-role.entity';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { NullableType } from '@utils/types/nullable.type';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Action } from '@role/role.enum';

@Injectable()
export class RoleModuleService {
  constructor(private readonly roleModuleRepository: RoleModuleRepository) {}

  create(createRoleDto: CreateRoleModuleDto): Promise<RoleModuleEntity> {
    return this.roleModuleRepository.save(
      this.roleModuleRepository.create(createRoleDto),
    );
  }

  findAll(
    findOptions: FindManyOptions<RoleModuleEntity>,
  ): Promise<RoleModuleEntity[]> {
    return this.roleModuleRepository.find(findOptions);
  }

  findOne(
    findOneOptions: FindOneOptions<RoleModuleEntity>,
  ): Promise<NullableType<RoleModuleEntity>> {
    return this.roleModuleRepository.findOne(findOneOptions);
  }

  pagination(
    paginationOption: IPaginationOptions,
    findOptions:
      | FindOptionsWhere<RoleModuleEntity>
      | FindManyOptions<RoleModuleEntity>,
  ) {
    return paginate(
      this.roleModuleRepository,
      {
        limit: paginationOption.limit,
        page: paginationOption.page,
      },
      findOptions,
    );
  }

  update(
    id: Role['id'],
    updateRoleDto: UpdateRoleModuleDto,
  ): Promise<RoleModuleEntity> {
    return this.roleModuleRepository.save(
      this.roleModuleRepository.create({
        id,
        ...updateRoleDto,
      }),
    );
  }

  async remove(id: Role['id']): Promise<void> {
    await this.roleModuleRepository.softDelete(id);
  }

  async getPermission(
    userId: UserRole['userId'],
    module: RoleModuleEntity['module'],
    action: Action,
  ) {
    const permission = await this.findAll({
      where: {
        module,
        role: {
          userRole: {
            userId,
          },
        },
      },
      select: [`${action}`],
    });
    return permission;
  }
}
