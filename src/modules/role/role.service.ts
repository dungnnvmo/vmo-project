import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './role.repositoty';
import { Role } from './entities/role.entity';
import { NullableType } from '@utils/types/nullable.type';
import { EntityCondition } from '@utils/types/entity-condition.type';
import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { User } from '@users/entities/user.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Roles } from './role.enum';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleRepository.save(this.roleRepository.create(createRoleDto));
  }

  findOne(findOneOptions: FindOneOptions<Role>): Promise<NullableType<Role>> {
    return this.roleRepository.findOne(findOneOptions);
  }

  pagination(
    paginationOption: IPaginationOptions,
    findOptions: FindOptionsWhere<Role> | FindManyOptions<Role>,
  ) {
    return paginate(
      this.roleRepository,
      {
        limit: paginationOption.limit,
        page: paginationOption.page,
      },
      findOptions,
    );
  }

  update(id: Role['id'], updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.roleRepository.save(
      this.roleRepository.create({
        id,
        ...updateRoleDto,
      }),
    );
  }

  getUserRole(id: User['id']) {
    return this.roleRepository.find({
      where: {
        userRole: {
          userId: id,
        },
      },
      select: ['name', 'userRole'],
    });
  }

  async remove(id: Role['id']): Promise<void> {
    await this.roleRepository.softDelete(id);
  }
}
