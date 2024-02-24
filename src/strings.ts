function capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

type Parser<T> = (input: string) => T;

type TryParser<T> = (input: string) => T | undefined;

type StringFormatter = (key: string, ...args: any[]) => string;

type Stringifier<T> = (value: T, t: StringFormatter) => string;

function parseIfNeeded<T>(value: T | string, parser: (input: string) => T): T {
    return typeof value === 'string' ? parser(value) : value;
}

export { capitalizeFirstLetter, parseIfNeeded };
export type { Parser, TryParser, Stringifier };
