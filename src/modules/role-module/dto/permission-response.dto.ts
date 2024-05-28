import { IsBoolean } from 'class-validator';

export class PermissionResponseDto {
  @IsBoolean()
  isCanRead: boolean;

  @IsBoolean()
  isCanAdd: boolean;

  @IsBoolean()
  isCanEdit: boolean;

  @IsBoolean()
  isCanDelete: boolean;

  @IsBoolean()
  isCanApproved: boolean;
}
