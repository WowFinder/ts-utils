/* Attribution:
 * Mostly based on article by Maksim Zemskov at https://hackernoon.com/mastering-type-safe-json-serialization-in-typescript
 * (archived: https://web.archive.org/web/20240313183123/https://hackernoon.com/mastering-type-safe-json-serialization-in-typescript)
 * Main changes:
 *  - Type names adapted to StrictPascalCase
 *  - Improved JsonCompatible to also include primitives
 */

type JsonPrimitive = string | number | boolean | null | undefined;

type JsonValue =
    | JsonPrimitive
    | JsonValue[]
    | {
          [key: string]: JsonValue;
      };

/* eslint-disable @typescript-eslint/ban-types */
type NotAssignableToJson = bigint | symbol | Function;

type JsonCompatible<T> = T extends JsonPrimitive
    ? T
    : T extends NotAssignableToJson
      ? never
      : unknown extends T
        ? never
        : {
              [P in keyof T]: T[P] extends JsonValue
                  ? T[P]
                  : T[P] extends NotAssignableToJson
                    ? never
                    : JsonCompatible<T[P]>;
          };

function toJsonValue<T>(value: JsonCompatible<T>): JsonValue {
    return value;
}

function safeJsonStringify<T>(data: JsonCompatible<T>): string {
    return JSON.stringify(data);
}

function safeJsonParse(text: string): unknown {
    return JSON.parse(text);
}

function safeJsonClone<T>(obj: JsonCompatible<T>): T {
    return safeJsonParse(safeJsonStringify(obj)) as T;
}

interface JsonExportable<T> {
    export(): JsonCompatible<T>;
}

export { safeJsonClone, safeJsonParse, safeJsonStringify, toJsonValue };
export type {
    JsonCompatible,
    JsonExportable,
    JsonPrimitive,
    JsonValue,
    NotAssignableToJson,
};
