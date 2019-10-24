export * from './project/schema';

export interface INormalizedData<E, R> {
  entities: E;
  result: R;
}
