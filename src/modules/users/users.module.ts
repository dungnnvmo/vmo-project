import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RoleModuleModule } from '@role-module/role-module.module';
import { CanDoGuard } from '@role/guards/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RoleModuleModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
