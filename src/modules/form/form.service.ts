import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { FormRepository } from './form.repository';
import { Form } from './entities/form.entity';
import { NullableType } from '@utils/types/nullable.type';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  In,
  Not,
} from 'typeorm';
import { IPaginationOptions } from '@utils/types/pagination-options';
import { paginate } from 'nestjs-typeorm-paginate';
import { FormStatus, FormType } from './form.enum';
import { UserFormService } from '@user-form/user-form.service';
import { UsersService } from '@users/users.service';
import { FormDetailService } from '@form-detail/form-detail.service';
import { NotificationService } from '@notification/notification.service';

@Injectable()
export class FormService {
  constructor(
    private readonly formRepository: FormRepository,
    private readonly formDetailService: FormDetailService,
    private readonly userFormService: UserFormService,
  ) { }

  async create(createFormDto: CreateFormDto): Promise<Form> {
    const form = await this.formRepository.save(
      this.formRepository.create({
        ...createFormDto,
      }),
    );
    await this.formDetailService.create({
      ...createFormDto.formDetail,
      formId: form.id,
    });
    const createUserFormOption = { formId: form.id };

    if (createFormDto.userId && createFormDto.userId.length != 0) {
      createUserFormOption['userIds'] = createFormDto.userId;
    }
    await this.userFormService.createUserForm(createUserFormOption);
    return form;
  }

  findAll(findOptions?: FindManyOptions<Form>): Promise<Form[]> {
    return this.formRepository.find(findOptions);
  }

  findOne(findOneOptions: FindOneOptions<Form>): Promise<NullableType<Form>> {
    return this.formRepository.findOne(findOneOptions);
  }

  getByType(paginationOption: IPaginationOptions, type: FormType) {
    return this.pagination(
      {
        limit: paginationOption.limit,
        page: paginationOption.page,
      },
      {
        where: {
          type,
        },
      },
    );
  }

  pagination(
    paginationOption: IPaginationOptions,
    findOptions?: FindOptionsWhere<Form> | FindManyOptions<Form>,
  ) {
    return paginate(
      this.formRepository,
      {
        limit: paginationOption.limit,
        page: paginationOption.page,
      },
      findOptions,
    );
  }

  async update(id: Form['id'], updateFormDto: UpdateFormDto) {
    const form = await this.findOne({
      where: {
        id,
      },
    });

    if (!form) {
      throw new BadRequestException(`form with id ${id} doesn't exists`);
    }

    return this.formRepository.save(
      this.formRepository.create({
        id,
        ...updateFormDto,
      }),
    );
  }

  async remove(deleteOption: FindOptionsWhere<Form>): Promise<void> {
    Promise.all([
      this.userFormService.remove({
        form: deleteOption,
      }),
      this.formDetailService.remove({
        form: deleteOption,
      }),
    ]);

    await this.formRepository.softDelete(deleteOption);
  }
}
