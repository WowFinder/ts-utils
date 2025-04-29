type Keyed<T = string> = {
    key: T;
};

type Labeled<T extends object = object> = T & {
    label: string;
};

type OptionalKeyResolver<T> = (key: string) => T | undefined;

type ForcedKeyResolver<T> = (key: string) => T;

type RequiredKeys<T> = {
    [K in keyof T]: object extends Pick<T, K> ? never : K;
} extends { [_ in keyof T]: infer U }
    ? U
    : never;

type OnlyRequired<T> = Pick<T, RequiredKeys<T>>;

export type {
    Keyed,
    Labeled,
    OptionalKeyResolver,
    ForcedKeyResolver,
    RequiredKeys,
    OnlyRequired,
};
