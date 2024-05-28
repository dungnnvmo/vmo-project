import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserFormDto } from './dto/create-user-form.dto';
import { UpdateUserFormDto } from './dto/update-user-form.dto';
import { UserForm } from './entities/user-form.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, In } from 'typeorm';
import { UserFormRepository } from './user-form.repository';
import { NullableType } from '@utils/types/nullable.type';
import { FormStatus, FormType } from '@form/form.enum';
import { NotificationService } from '@notification/notification.service';
import { UsersService } from '@users/users.service';
import { UserFormDetailService } from '@user-form-detail/user-form-detail.service';
import { User } from '@users/entities/user.entity';
import { RoleService } from '@role/role.service';
import { Roles } from '@role/role.enum';
import { UserRoleService } from '@user-role/user-role.service';

@Injectable()
export class UserFormService {
  constructor(
    private readonly userFormRepository: UserFormRepository,
    private readonly userService: UsersService,
    private readonly notificationService: NotificationService,
    private readonly userFormDetailService: UserFormDetailService,
    private readonly roleService: RoleService,
    private readonly userRoleSerivce: UserRoleService,
  ) { }

  create(createFormDto: CreateUserFormDto): Promise<UserForm> {
    return this.userFormRepository.save(
      this.userFormRepository.create(createFormDto),
    );
  }

  async findAll(
    id: User['id'],
    paginationOption: IPaginationOptions,
    type?: FormType,
  ) {
    const userRole = await this.roleService.getUserRole(id);
    const checkRole = userRole.some((role) =>
      [Roles.ADMIN, Roles.HR, Roles.DIRECTOR].includes(role.name),
    );
    const where = type
      ? [
        { form: { type }, userFormDetail: { employeeId: id } },
        { form: { type }, userFormDetail: { managerId: id } },
        { form: { type }, userFormDetail: { directorId: id } },
      ]
      : [
        { userFormDetail: { employeeId: id } },
        { userFormDetail: { managerId: id } },
        { userFormDetail: { directorId: id } },
      ];
    const findOptions: FindManyOptions<UserForm> = checkRole
      ? { where: { form: { type } } }
      : { where };

    return this.pagination(paginationOption, findOptions);
  }

  findOne(
    findOneOptions: FindOneOptions<UserForm>,
  ): Promise<NullableType<UserForm>> {
    return this.userFormRepository.findOne(findOneOptions);
  }

  pagination(
    paginationOption: IPaginationOptions,
    findOptions?: FindOptionsWhere<UserForm> | FindManyOptions<UserForm>,
  ) {
    return paginate(
      this.userFormRepository,
      {
        limit: paginationOption.limit ?? 50,
        page: paginationOption.page ?? 1,
      },
      findOptions,
    );
  }

  async createUserForm(
    createUserFormDto: CreateUserFormDto,
  ): Promise<UserForm[]> {
    let findUserOption: FindManyOptions<User> = {
      select: ['id', 'email'],
    };

    if (createUserFormDto.userIds) {
      findUserOption['where'] = {
        userForms: {
          userId: In(createUserFormDto.userIds),
        },
      };
    }
    const users = await this.userService.findAll(findUserOption);
    const forms = await Promise.all(
      users.map(async (user) => {
        const newForm = await this.create({
          formId: createUserFormDto.formId,
          status: FormStatus.NEW,
          userId: user.id,
        });

        await this.userFormDetailService.create({
          userFormId: newForm.id,
          employeeId: user.id,
        });

        await this.notificationService.createdForm({
          to: user.email,
          data: {
            id: user.id,
          },
        });

        return newForm;
      }),
    );
    return forms;
  }

  getStatus(
    paginationOption: IPaginationOptions,
    formType: FormType,
  ) {

    return this.pagination(paginationOption, {
      where: {
        form: {
          type: formType,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      select: ['id', 'formId', 'createdAt', 'status'],
    });
  }

  async update(
    id: UserForm['formId'],
    updateFormDto: UpdateUserFormDto,
  ): Promise<void> {
    const { userFormDetailDto, ...formInfo } = updateFormDto;
    const userFormDetail = await this.userFormDetailService.findOne({
      where: {
        userForm: [
          {
            id,
          },
        ],
      },
      relations: ['userForm'],
      select: ['id', 'userForm'],
    });
    if (!userFormDetail) {
      throw new NotFoundException(`Form detail with id: ${id} doesn't exists!`);
    }
    if (userFormDetailDto) {
      await this.userFormDetailService.update(
        userFormDetail.id,
        userFormDetailDto,
      );
    }
    await this.userFormRepository.update(id, formInfo);
  }

  async submitForm(
    id: UserForm['id'],
    updateFormDto: UpdateUserFormDto,
  ): Promise<void> {
    const userId = updateFormDto.employeeId;
    const userRole = await this.userRoleSerivce.getUserById(userId);

    const managerId = userRole[0]?.managerId;
    const checkRole = userRole.some((user) => {
      return [Roles.MANAGER, Roles.DIRECTOR, Roles.ADMIN].includes(user.role);
    });
    const updateUserFormDetailDto = checkRole
      ? {
        status: updateFormDto.status,
        userFormDetailDto: { directorId: managerId },
      }
      : {
        status: updateFormDto.status,
        userFormDetailDto: { managerId: managerId },
      };

    await this.update(id, updateUserFormDetailDto);
  }

  async getById(id: UserForm['id'], userId): Promise<UserForm> {
    const userRole = await this.userRoleSerivce.getUserById(userId);
    const isHR = userRole.some((user) => {
      return [Roles.HR, Roles.DIRECTOR, Roles.ADMIN].includes(user.role);
    });

    const conditions = isHR
      ? [{ id: id }]
      : ['employeeId', 'managerId'].map((role) => ({
        id,
        userFormDetail: {
          [role]: userId,
        },
      }));
    const userForm = await this.findOne({
      where: conditions,
      relations: ['userFormDetail'],
    });
    if (!userForm) {
      throw new NotFoundException(
        `Can not find form detail with id: ${id} doesn't exists!`,
      );
    }
    return userForm;
  }

  async remove(deleteOption: FindOptionsWhere<UserForm>): Promise<void> {
    const userFormId = await this.userFormRepository.find({
      where: deleteOption,
      select: ['id'],
    });
    const ids = userFormId.map((item) => item.id);
    await this.userFormDetailService.remove({ userFormId: In(ids) });
    await this.userFormRepository.softDelete(deleteOption);
  }
}
