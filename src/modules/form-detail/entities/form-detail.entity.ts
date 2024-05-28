import { Form } from '@form/entities/form.entity';
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

@Entity('form_detail')
export class FormDetail extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'content', type: 'varchar', nullable: true })
  content: string;

  @Column({ name: 'rating_point', type: 'integer', nullable: true })
  ratingPoint: number;

  @Column({ name: 'form_id', type: 'uuid', nullable: false })
  formId: string;

  @Column({ name: 'manager_id', type: 'uuid', nullable: true })
  managerId: string;

  @Column({ name: 'employee_id', type: 'uuid', nullable: true })
  employeeId: string;

  @Column({ name: 'director_id', type: 'uuid', nullable: true })
  directorId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @OneToOne(() => Form, (form) => form.formDetails)
  @JoinColumn({ name: 'form_id' })
  form: Form;

  @ManyToOne(() => User, (user) => user.managedForms)
  @JoinColumn({ name: 'manager_id' })
  manager: User;

  @ManyToOne(() => User, (user) => user.employeeForms)
  @JoinColumn({ name: 'employee_id' })
  employee: User;

  @ManyToOne(() => User, (user) => user.directedForms)
  @JoinColumn({ name: 'director_id' })
  director: User;
}
