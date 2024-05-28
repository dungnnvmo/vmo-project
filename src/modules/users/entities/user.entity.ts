import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { UserRole } from '@user-role/entities/user-role.entity';
import { FormDetail } from '@form-detail/entities/form-detail.entity';
import { UserForm } from '@user-form/entities/user-form.entity';
import { UserFormDetail } from '@user-form-detail/entities/user-form-detail.entity';

@Entity({
  name: 'user',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', type: 'varchar', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', nullable: false })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ name: 'phone', type: 'varchar', nullable: true })
  phone: string;

  @Column({ name: 'avatar', type: 'varchar', nullable: true })
  avatar: string;

  @Column({
    name: 'citizen_identity_card',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  cic: string;

  @Column({
    name: 'social_insurance_number',
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  sin: string;

  @Column({ name: 'address', type: 'varchar', nullable: true })
  address: string;

  @Column({ name: 'manager_id', nullable: true, unique: false })
  managerId: string;

  @Column({ name: 'password', type: 'varchar', nullable: true })
  @Exclude()
  password: string;

  @Column({ name: 'salt', type: 'varchar', nullable: true })
  @Exclude()
  salt: string;

  @Column({
    name: 'is_confirmed',
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isConfirmed: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deleteAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'manager_id' })
  manager: User;

  @OneToMany(() => FormDetail, (formDetail) => formDetail.manager)
  managedForms: FormDetail[];

  @OneToMany(() => FormDetail, (formDetail) => formDetail.employee)
  employeeForms: FormDetail[];

  @OneToMany(() => FormDetail, (formDetail) => formDetail.director)
  directedForms: FormDetail[];

  @OneToMany(() => UserFormDetail, (userFormDetail) => userFormDetail.manager)
  managedUserForms: UserFormDetail[];

  @OneToMany(() => UserFormDetail, (userFormDetail) => userFormDetail.employee)
  employeeUserForms: UserFormDetail[];

  @OneToMany(() => UserFormDetail, (userFormDetail) => userFormDetail.director)
  directedUserForms: UserFormDetail[];

  @OneToMany(() => UserForm, (userForm) => userForm.user)
  userForms: UserForm[];

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];

  async validatePassword(password: string): Promise<boolean> {
    const hashPassword = await bcrypt.compare(password, this.password);
    return hashPassword;
  }
}
