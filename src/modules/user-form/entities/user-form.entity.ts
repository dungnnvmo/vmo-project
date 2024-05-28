import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities/user.entity';
import { Form } from '@form/entities/form.entity';
import { FormStatus } from '@form/form.enum';
import { UserFormDetail } from '@user-form-detail/entities/user-form-detail.entity';

@Entity({
  name: 'user_form',
})
export class UserForm extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId: string;

  @Column({ name: 'form_id', type: 'uuid', nullable: false })
  formId: string;

  @Column({ type: 'enum', enum: FormStatus, nullable: false })
  status: FormStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at', type: 'timestamp', nullable: true })
  deleteAt: Date;

  @ManyToOne(() => User, (user) => user.userForms)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Form, (form) => form.userForms)
  @JoinColumn({ name: 'form_id' })
  form: Form;

  @OneToOne(() => UserFormDetail, (userFormDetail) => userFormDetail.userForm)
  userFormDetail: UserFormDetail[];
}
