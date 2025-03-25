type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type Quantified<T> = {
    item: T;
    qtty: number;
};

type Counter = {
    min: number;
    max: number;
    current: number;
    initial: number;
};

interface Keyed<T = string> {
    key: T;
}

type Labeled<T extends object = object> = T & {
    label: string;
};

type NonPrivate<T> = Pick<T, Exclude<keyof T, `#${string}`>>;

// Explicitly breaking naming convention to support the `''` (nameles) key
// eslint-disable-next-line @typescript-eslint/naming-convention
type Expanded<T extends { [key: string]: V }, V> = T & { ''?: V };

type Validator<T> = (value: T) => boolean;

type PossiblyString<T> = Exclude<T, string> | string;

type OptionalKeyResolver<T> = (key: string) => T | undefined;

type ForcedKeyResolver<T> = (key: string) => T;

type RequiredKeys<T> = {
    [K in keyof T]: object extends Pick<T, K> ? never : K;
} extends { [_ in keyof T]: infer U }
    ? U
    : never;

type OnlyRequired<T> = Pick<T, RequiredKeys<T>>;

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
    Counter,
    DeepRequired,
    Expanded,
    ForcedKeyResolver,
    Keyed,
    Labeled,
    NonPrivate,
    OnlyRequired,
    Optional,
    OptionalKeyResolver,
    PossiblyString,
    Quantified,
    Validator,
};
export type * from './Record';
