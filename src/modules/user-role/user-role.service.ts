import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRole } from './entities/user-role.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { NullableType } from '@utils/types/nullable.type';
import { UserRoleRepository } from './user-role.repository';
import { Roles } from '@role/role.enum';

@Injectable()
export class UserRoleService {
  constructor(private readonly UserRoleRepository: UserRoleRepository) {}

  create(createUserRoleDto: CreateUserRoleDto): Promise<UserRole> {
    return this.UserRoleRepository.save(
      this.UserRoleRepository.create(createUserRoleDto),
    );
  }

  findAll(findOptions?: FindManyOptions<UserRole>): Promise<UserRole[]> {
    return this.UserRoleRepository.find(findOptions);
  }

  findOne(
    findOneOptions: FindOneOptions<UserRole>,
  ): Promise<NullableType<UserRole>> {
    return this.UserRoleRepository.findOne(findOneOptions);
  }

  pagination(
    paginationOption: IPaginationOptions,
    findOptions: FindOptionsWhere<UserRole> | FindManyOptions<UserRole>,
  ) {
    return paginate(
      this.UserRoleRepository,
      {
        limit: paginationOption.limit,
        page: paginationOption.page,
      },
      findOptions,
    );
  }

  update(
    id: UserRole['id'],
    updateRoleDto: UpdateUserRoleDto,
  ): Promise<UserRole> {
    return this.UserRoleRepository.save(
      this.UserRoleRepository.create({
        id,
        ...updateRoleDto,
      }),
    );
  }

  async remove(id: UserRole['id']): Promise<void> {
    await this.UserRoleRepository.softDelete(id);
  }

  async getUserById(id: UserRole['userId']) {
    const userRoles = await this.findAll({
      where: {
        userId: id,
      },
      relations: ['user', 'role'],
      select: ['role', 'user'],
    });

    const userInfo = userRoles.map((item) => {
      return {
        managerId: item.user.managerId,
        role: item.role.name,
      };
    });

    return userInfo;
  }

  async getUserByRole(role: Roles): Promise<UserRole> {
    return this.findOne({
      where: {
        role: {
          name: role,
        },
      },
      select: ['userId'],
    });
  }
}
