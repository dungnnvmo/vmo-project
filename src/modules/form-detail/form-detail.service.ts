import { Injectable } from '@nestjs/common';
import { CreateFormDetailDto } from './dto/create-form-detail.dto';
import { UpdateFormDetailDto } from './dto/update-form-detail.dto';
import { FormDetailRepository } from './form-detail.repository';
import { FormDetail } from './entities/form-detail.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { NullableType } from '@utils/types/nullable.type';

@Injectable()
export class FormDetailService {
  constructor(private readonly formDetailRepository: FormDetailRepository) {}

  create(createFormDetailDto: CreateFormDetailDto): Promise<FormDetail> {
    return this.formDetailRepository.save(
      this.formDetailRepository.create(createFormDetailDto),
    );
  }

  findOne(
    findOneOptions: FindOneOptions<FormDetail>,
  ): Promise<NullableType<FormDetail>> {
    return this.formDetailRepository.findOne(findOneOptions);
  }

  pagination(
    paginationOption: IPaginationOptions,
    findOptions: FindOptionsWhere<FormDetail> | FindManyOptions<FormDetail>,
  ) {
    return paginate(
      this.formDetailRepository,
      {
        limit: paginationOption.limit,
        page: paginationOption.page,
      },
      findOptions,
    );
  }

  update(
    id: FormDetail['id'],
    updateFormDetailDto: UpdateFormDetailDto,
  ): Promise<FormDetail> {
    return this.formDetailRepository.save(
      this.formDetailRepository.create({
        id,
        ...updateFormDetailDto,
      }),
    );
  }

  async remove(deleteOption: FindOptionsWhere<FormDetail>): Promise<void> {
    await this.formDetailRepository.softDelete(deleteOption);
  }
}
