import {
    toJsonValue,
    safeJsonStringify,
    safeJsonParse,
    safeJsonClone,
    JsonValue,
} from '../json';

const validJsonValue: JsonValue = { foo: 'bar' };
const invalidJsonObject = { foo: Symbol('bar') };
const validJsonString = JSON.stringify(validJsonValue);

describe('utils/json.ts', () => {
    describe('toJsonValue', () => {
        it('should pass through a compatible object', () => {
            const jsonValue = toJsonValue(validJsonValue);
            expect(jsonValue).toBe(validJsonValue);
        });
        it('should pass through an invalid object when type-coerced', () => {
            const jsonValue = toJsonValue(invalidJsonObject as any);
            expect(jsonValue).toBe(invalidJsonObject);
        });
    });
    describe('safeJsonStringify', () => {
        it('should stringify a compatible object', () => {
            const jsonValue = toJsonValue(validJsonValue);
            expect(safeJsonStringify(jsonValue)).toBe(validJsonString);
        });
    });
    describe('safeJsonParse', () => {
        it('should parse a stringified object', () => {
            expect(safeJsonParse(validJsonString)).toEqual(validJsonValue);
        });
    });
    describe('jClone', () => {
        it('should clone null values', () => {
            const value = null;
            expect(value).toBe(safeJsonClone(value));
        });
        it('should clone primitive values', () => {
            const values = [true, 42, 'hello'];
            for (const value of values) {
                expect(value).toBe(safeJsonClone(value));
            }
        });
        it('should clone array values', () => {
            const value = [1, 2, 3];
            expect(value).toEqual(safeJsonClone(value));
            expect(value).not.toBe(safeJsonClone(value));
        });
        it('should clone object values', () => {
            const value = { foo: 'bar' };
            expect(value).toEqual(safeJsonClone(value));
            expect(value).not.toBe(safeJsonClone(value));
        });
        it('should clone nested values', () => {
            const value = { foo: [1, '2', 3], bar: { baz: true } };
            const cloned = safeJsonClone(value);
            expect(value).toEqual(cloned);
            expect(value).not.toBe(cloned);
            expect(value.foo).not.toBe(cloned.foo);
            expect(value.bar).not.toBe(cloned.bar);
        });
    });
});
