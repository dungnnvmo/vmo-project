import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { EntityCondition } from '@utils/types/entity-condition.type';
import * as bcrypt from 'bcrypt';
import { NullableType } from '@utils/types/nullable.type';
import { Roles } from '@role/role.enum';
import { FindManyOptions, FindOneOptions } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const { email, password, ...userInfo } = createUserDto;
    const newUser = this.userRepository.create(userInfo);
    newUser.email = email;

    if (password) {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      newUser.salt = salt;
      newUser.password = hashPassword;
    } else {
      newUser.salt = null;
      newUser.password = null;
    }
    try {
      newUser.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`Email is already exist`);
      }
      throw new InternalServerErrorException(error);
    }
  }

  findAll(findOptions?: FindManyOptions<User>): Promise<User[]> {
    return this.userRepository.find(findOptions);
  }

  findOne(findOptions: FindOneOptions<User>): Promise<NullableType<User>> {
    return this.userRepository.findOne(findOptions);
  }

  update(id: User['id'], updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.save(
      this.userRepository.create({
        id,
        ...updateUserDto,
      }),
    );
  }

  async remove(id: User['id']): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}
