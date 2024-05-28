import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { FormStatus, FormType } from '@form/form.enum';
import { UsersService } from '@users/users.service';
import { Roles } from '@role/role.enum';
import { UserFormService } from '@user-form/user-form.service';
import { In, Not } from 'typeorm';
import { ReportDto } from './dto/report-response.dto';
import { log } from 'console';
import { Role } from '@role/entities/role.entity';

@Injectable()
export class ReportService {
  constructor(
    private readonly userService: UsersService,
    private readonly userFormService: UserFormService,
  ) { }

  async getStatus(paginationOption: IPaginationOptions, formType: FormType) {
    return this.userFormService.getStatus(paginationOption, formType);
  }

  async reportFormCompletion(formType: FormType): Promise<ReportDto> {
    const notCompletedUsers = await this.userService.findAll({
      where: {
        userForms: {
          status: Not(FormStatus.CLOSED),
          form: {
            type: formType,
          },
        },
      },
    });
    console.log(notCompletedUsers)
    const ids = notCompletedUsers.map((userForm) => userForm.id);
    console.log(ids)
    const completedUers = await this.userService.findAll({
      where: {
        id: Not(In(ids)),
      },
    });
    return {
      notCompletedUsers,
      completedUers,
    };
  }
}
