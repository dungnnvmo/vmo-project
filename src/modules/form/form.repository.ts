import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Form } from './entities/form.entity';

@Injectable()
export class FormRepository extends Repository<Form> {
  constructor(private datasource: DataSource) {
    super(Form, datasource.createEntityManager());
  }
}
