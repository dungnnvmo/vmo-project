import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  DeleteDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@role/role.enum';
import { RoleModuleEntity } from '@role-module/entities/role-module.entity';
import { UserRole } from '@user-role/entities/user-role.entity';
import { FormStatus, FormType } from '@form/form.enum';
import { UserForm } from '@user-form/entities/user-form.entity';
import { FormDetail } from '@form-detail/entities/form-detail.entity';

@Entity({
  name: 'form',
})
export class Form extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'type', type: 'enum', enum: FormType, nullable: false })
  type: FormType;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at', type: 'timestamp', nullable: true })
  deleteAt: Date;

  @OneToMany(() => RoleModuleEntity, (roleModule) => roleModule.role)
  roleModule: RoleModuleEntity;

  @OneToMany(() => UserForm, (userForm) => userForm.form)
  userForms: UserForm[];

  @OneToOne(() => FormDetail, (formDetail) => formDetail.form)
  formDetails: FormDetail;
}
