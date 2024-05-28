import { User } from '@users/entities/user.entity';

export class ReportDto {
  notCompletedUsers: User[];
  completedUers: User[];
}
