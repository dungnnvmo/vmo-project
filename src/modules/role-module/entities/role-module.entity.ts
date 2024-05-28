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
import { Roles } from '@role/role.enum';
import { Role } from '@role/entities/role.entity';

@Entity({
  name: 'role_module',
})
export class RoleModuleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'role_id', type: 'uuid', nullable: false })
  roleId: string;

  @Column({ name: 'module', type: 'varchar', nullable: false })
  module: string;

  @Column({ name: 'is_can_read', type: 'varchar', nullable: false })
  isCanRead: boolean;

  @Column({ name: 'is_can_add', type: 'varchar', nullable: false })
  isCanAdd: boolean;

  @Column({ name: 'is_can_edit', type: 'varchar', nullable: false })
  isCanEdit: boolean;

  @Column({ name: 'is_can_delete', type: 'varchar', nullable: false })
  isCanDelete: boolean;

  @Column({ name: 'is_can_apporved', type: 'varchar', nullable: false })
  isCanApproved: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at', type: 'timestamp', nullable: true })
  deleteAt: Date;

  @JoinColumn({ name: 'role_id' })
  @ManyToOne(() => Role, (role) => role.roleModule)
  role: Role;
}
