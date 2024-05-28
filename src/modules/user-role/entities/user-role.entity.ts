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
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@role/entities/role.entity';
import { User } from '@users/entities/user.entity';

@Entity({
  name: 'user_role',
})
export class UserRole extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'role_id', type: 'uuid', nullable: false })
  roleId: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at', type: 'timestamp', nullable: true })
  deleteAt: Date;

  @JoinColumn({ name: 'role_id' })
  @ManyToOne(() => Role, (role) => role.userRole)
  role: Role;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.userRoles)
  user: User;
}
