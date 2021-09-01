export type IdentifierFunction<T> = (entity: T) => string;
export type Identifier<T> = string | IdentifierFunction<T>;
export type Property = string;
export type Items = Record<string, unknown>;
export type ListSelection = Record<string, boolean>;
