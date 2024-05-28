// SetAction.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Action } from '@role/role.enum';

export const ACTION_KEY = 'action';
export const SetAction = (action: Action) => SetMetadata(ACTION_KEY, action);
