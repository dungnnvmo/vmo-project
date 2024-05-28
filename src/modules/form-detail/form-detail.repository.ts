import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FormDetail } from './entities/form-detail.entity';

@Injectable()
export class FormDetailRepository extends Repository<FormDetail> {
  constructor(private datasource: DataSource) {
    super(FormDetail, datasource.createEntityManager());
  }
}
