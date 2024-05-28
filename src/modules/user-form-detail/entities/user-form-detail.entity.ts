import { Form } from '@form/entities/form.entity';
import { UserForm } from '@user-form/entities/user-form.entity';
import { User } from '@users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
  OneToOne,
} from 'typeorm';

@Entity('user_form_detail')
export class UserFormDetail extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'content', type: 'varchar', nullable: true })
  content: string;

  @Column({ name: 'rating_point', type: 'integer', nullable: true })
  ratingPoint: number;

  @Column({ name: 'user_form_id', type: 'uuid', nullable: false })
  userFormId: string;

  @Column({ name: 'manager_id', type: 'uuid', nullable: true })
  managerId: string;

  @Column({ name: 'employee_id', type: 'uuid', nullable: false })
  employeeId: string;

  @Column({ name: 'director_id', type: 'uuid', nullable: true })
  directorId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @OneToOne(() => UserForm, (userForm) => userForm.userFormDetail)
  @JoinColumn({ name: 'user_form_id' })
  userForm: UserForm;

  @ManyToOne(() => User, (user) => user.managedUserForms)
  @JoinColumn({ name: 'manager_id' })
  manager: User;

  @ManyToOne(() => User, (user) => user.employeeUserForms)
  @JoinColumn({ name: 'employee_id' })
  employee: User;

  @ManyToOne(() => User, (user) => user.directedUserForms)
  @JoinColumn({ name: 'director_id' })
  director: User;
}
