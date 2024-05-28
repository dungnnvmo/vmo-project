import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserForm } from './entities/user-form.entity';

@Injectable()
export class UserFormRepository extends Repository<UserForm> {
  constructor(private datasource: DataSource) {
    super(UserForm, datasource.createEntityManager());
  }
}
