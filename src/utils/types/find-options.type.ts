import { EntityCondition } from './entity-condition.type';

export type findOption<T> = {
  where: EntityCondition<T>[] | EntityCondition<T>;
};
