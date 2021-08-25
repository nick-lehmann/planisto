export type IdentifierFunction<T> = (entity: T) => string;
export type Identifier<T> = string | IdentifierFunction<T>;
export type Property = string;
export type Item = Record<string, unknown>;
export type Items = Record<string, Item>;
export type ListSelection = Record<string, boolean>;
