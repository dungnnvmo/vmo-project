import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserFormDetail } from './entities/user-form-detail.entity';

@Injectable()
export class UserFormDetailRepository extends Repository<UserFormDetail> {
  constructor(private datasource: DataSource) {
    super(UserFormDetail, datasource.createEntityManager());
  }
}
