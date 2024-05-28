// SetModule.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const MODULE_KEY = 'module';
export const SetModule = (module: string) => SetMetadata(MODULE_KEY, module);
