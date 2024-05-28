import { SetMetadata } from '@nestjs/common';
import { Action } from '@role/role.enum';

export const SetActionAndModule = (action: Action, module: string) => {
  return (
    target: any,
    key?: string,
    descriptor?: TypedPropertyDescriptor<any>,
  ) => {
    SetMetadata('action', action)(target, key, descriptor);
    SetMetadata('module', module)(target, key, descriptor);
  };
};
