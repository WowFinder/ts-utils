import { JsonValue, JsonCompatible } from '../json';
import { expectAssignable, expectNotAssignable } from 'tsd';

describe('utils/json.ts', () => {
    describe('JsonValue', () => {
        it('should allow null values', () => {
            const value: JsonValue = null;
            expectAssignable<JsonValue>(value);
            expect(value).toBeNull();
        });

        it('should allow boolean values', () => {
            const value: JsonValue = true;
            expectAssignable<JsonValue>(value);
            expect(value).toBe(true);
        });

        it('should allow number values', () => {
            const value: JsonValue = 42;
            expectAssignable<JsonValue>(value);
            expect(value).toBe(42);
        });

        it('should allow string values', () => {
            const value: JsonValue = 'hello';
            expectAssignable<JsonValue>(value);
            expect(value).toBe('hello');
        });

        it('should allow array values', () => {
            const value: JsonValue = [1, 2, 3];
            expectAssignable<JsonValue>(value);
            expect(value).toEqual([1, 2, 3]);
        });

        it('should allow object values', () => {
            const value: JsonValue = { foo: 'bar' };
            expectAssignable<JsonValue>(value);
            expect(value).toEqual({ foo: 'bar' });
        });

        it('should allow nested values', () => {
            const value: JsonValue = { foo: [1, '2', 3], bar: { baz: true } };
            expectAssignable<JsonValue>(value);
        });

        it('should not allow function values', () => {
            expectNotAssignable<JsonValue>(() => {});
        });

        it('should not allow symbol values', () => {
            expectNotAssignable<JsonValue>(Symbol('foo'));
        });

        it('should not allow bigint values', () => {
            expectNotAssignable<JsonValue>(42n);
        });

        it('should not allow undefined values', () => {
            expectNotAssignable<JsonValue>(undefined);
        });

        it('should not allow Date values', () => {
            expectNotAssignable<JsonValue>(new Date());
        });

        it('should not allow RegExp values', () => {
            expectNotAssignable<JsonValue>(/foo/);
        });

        it('should not allow nested invalid values', () => {
            expectNotAssignable<JsonValue>({ foo: () => {} });
        });

        it('should not allow values without a mutable string (or numeric) index signature', () => {
            expectNotAssignable<JsonValue>({ [Symbol('foo')]: 'bar' });
            expectNotAssignable<JsonValue>({ foo: 'bar' } as const);
        });
    });
    describe('JsonCompatible', () => {
        it('should allow JsonValue', () => {
            type Compatible = JsonCompatible<JsonValue>;
            expectAssignable<JsonValue>({} as Compatible);
        });
        it('should not allow NotAssignableToJson', () => {
            type NotBigInt = JsonCompatible<bigint>;
            expectNotAssignable<NotBigInt>(42n);
            type NotSymbol = JsonCompatible<symbol>;
            expectNotAssignable<NotSymbol>(Symbol('foo'));
        });
        it('should not allow unknown', () => {
            type NotUnknown = JsonCompatible<unknown>;
            expectNotAssignable<NotUnknown>(undefined);
        });
        it('should allow structures made with from valid JSON values', () => {
            type SimpleObject = JsonCompatible<{ foo: string }>;
            expectAssignable<SimpleObject>({ foo: 'bar' });
            type SimpleArray = JsonCompatible<string[]>;
            expectAssignable<SimpleArray>(['foo', 'bar']);
            type NestedObject = JsonCompatible<{ foo: { bar: number } }>;
            expectAssignable<NestedObject>({ foo: { bar: 42 } });
        });
        it('should not allow structures containing invalid JSON values', () => {
            type InvalidObject = JsonCompatible<{ foo: symbol }>;
            expectNotAssignable<InvalidObject>({ foo: Symbol('bar') });
        });
    });
});
