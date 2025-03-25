import { assertDefined, assertNonNull, assertNonNil } from '../assertions';

describe('utils/assertions.ts', () => {
    describe('assertDefined', () => {
        it('should throw an error if the value is undefined', () => {
            expect(() => assertDefined(undefined)).toThrow(
                'Value is undefined',
            );
        });

        it('should not throw an error if the value is defined', () => {
            expect(() => assertDefined('hello')).not.toThrow();
        });
    });

    describe('assertNonNull', () => {
        it('should throw an error if the value is null', () => {
            expect(() => assertNonNull(null)).toThrow('Value is null');
        });

        it('should not throw an error if the value is defined', () => {
            expect(() => assertNonNull('hello')).not.toThrow();
        });
    });

    describe('assertNonNil', () => {
        it('should throw an error if the value is null', () => {
            expect(() => assertNonNil(null)).toThrow('Value is null');
        });

        it('should throw an error if the value is undefined', () => {
            expect(() => assertNonNil(undefined)).toThrow(
                'Value is undefined',
            );
        });

        it('should not throw an error if the value is defined', () => {
            expect(() => assertNonNil('hello')).not.toThrow();
        });
    });
});
