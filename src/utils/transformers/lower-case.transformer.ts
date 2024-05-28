import { MaybeType } from '@utils/types/maybe.type';
import { TransformFnParams } from 'class-transformer';

export const lowerCaseTransformer = (
  params: TransformFnParams,
): MaybeType<string> => params.value?.toLowerCase().trim();
