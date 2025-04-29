type NonPrivate<T> = Pick<T, Exclude<keyof T, `#${string}`>>;

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

// Explicitly breaking naming convention to support the `''` (nameles) key
// eslint-disable-next-line @typescript-eslint/naming-convention
type Expanded<T extends { [key: string]: V }, V> = T & { ''?: V };

type Validator<T> = (value: T) => boolean;

type PossiblyString<T> = Exclude<T, string> | string;

type NotNill<T> = T extends null | undefined ? never : T;

type Primitive = undefined | null | boolean | string | number | Function;

type DeepRequired<T> = T extends Primitive
    ? NotNill<T>
    : {
          [P in keyof T]-?: T[P] extends Array<infer U>
              ? Array<DeepRequired<U>>
              : T[P] extends ReadonlyArray<infer U2>
                ? DeepRequired<U2>
                : DeepRequired<T[P]>;
      };

export type {
    NonPrivate,
    Optional,
    Expanded,
    Validator,
    PossiblyString,
    NotNill,
    Primitive,
    DeepRequired,
};
