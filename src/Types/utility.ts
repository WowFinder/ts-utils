type NonPrivate<T> = Pick<T, Exclude<keyof T, `#${string}`>>;

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

// Explicitly breaking naming convention to support the `''` (nameles) key
// eslint-disable-next-line @typescript-eslint/naming-convention
type Expanded<T extends { [key: string]: V }, V> = T & { ''?: V };

type Validator<T> = (value: T) => boolean;

type Transform<T, U = T> = (value: T) => U;

type PossiblyString<T> = Exclude<T, string> | string;

type NotNill<T> = T extends null | undefined ? never : T;

type Primitive = undefined | null | boolean | string | number | Function;

export type {
    NonPrivate,
    Optional,
    Expanded,
    Validator,
    Transform,
    PossiblyString,
    NotNill,
    Primitive,
};
