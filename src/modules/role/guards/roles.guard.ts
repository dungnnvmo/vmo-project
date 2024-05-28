import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleModuleService } from '@role-module/role-module.service';
import { Action } from '@role/role.enum';

@Injectable()
export class CanDoGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userRoleService: RoleModuleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const module = this.reflector.getAllAndOverride<string>('module', [
      context.getHandler(),
      context.getClass(),
    ]);
    const action = this.reflector.getAllAndOverride<Action>('action', [
      context.getHandler(),
      context.getClass(),
    ]);
    const permissions = await this.userRoleService.getPermission(
      userId,
      module,
      action,
    );
    if (permissions.length === 0) {
      return false;
    }
    return permissions.some(
      (permission) =>
        permission[action] && permission[action].toString() === 'true',
    );
  }
}
