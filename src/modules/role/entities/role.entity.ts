import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@role/role.enum';
import { RoleModuleEntity } from '@role-module/entities/role-module.entity';
import { UserRole } from '@user-role/entities/user-role.entity';

@Entity({
  name: 'role',
})
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: Roles;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at', type: 'timestamp', nullable: true })
  deleteAt: Date;

  @OneToMany(() => RoleModuleEntity, (roleModule) => roleModule.role)
  roleModule: RoleModuleEntity[];

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRole: UserRole[];
}
