import { Injectable } from '@nestjs/common';
import { CreateUserFormDetailDto } from './dto/create-user-form-detail.dto';
import { UpdateUserFormDetailDto } from './dto/update-user-form-detail.dto';
import { UserFormDetailRepository } from './user-form-detail.repositosy';
import { UserFormDetail } from './entities/user-form-detail.entity';
import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { NullableType } from '@utils/types/nullable.type';
import { UserForm } from '@user-form/entities/user-form.entity';

@Injectable()
export class UserFormDetailService {
  constructor(
    private readonly userFormDetailRepository: UserFormDetailRepository,
  ) {}

  create(createRoleDto: CreateUserFormDetailDto): Promise<UserFormDetail> {
    return this.userFormDetailRepository.save(
      this.userFormDetailRepository.create(createRoleDto),
    );
  }

  findAll(
    findOptions: FindManyOptions<UserFormDetail>,
  ): Promise<UserFormDetail[]> {
    return this.userFormDetailRepository.find(findOptions);
  }

  findOne(
    findOneOptions: FindOneOptions<UserFormDetail>,
  ): Promise<NullableType<UserFormDetail>> {
    return this.userFormDetailRepository.findOne(findOneOptions);
  }

  pagination(
    paginationOption: IPaginationOptions,
    findOptions:
      | FindOptionsWhere<UserFormDetail>
      | FindManyOptions<UserFormDetail>,
  ) {
    return paginate(
      this.userFormDetailRepository,
      {
        limit: paginationOption.limit,
        page: paginationOption.page,
      },
      findOptions,
    );
  }

  async update(
    id: string,
    updateUserFormDto: UpdateUserFormDetailDto,
  ): Promise<void> {
    await this.userFormDetailRepository.update(id, updateUserFormDto);
  }

  async remove(deleteOption: FindOptionsWhere<UserFormDetail>): Promise<void> {
    await this.userFormDetailRepository.softDelete(deleteOption);
  }
}
