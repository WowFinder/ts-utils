import { asArray, arrayAsyncMap } from '../arrays';

describe('asArray', () => {
    test("should return the same reference if it's already an array", () => {
        const alreadyArray = [1, 2, 3];
        expect(asArray(alreadyArray)).toBe(alreadyArray);
    });

    test('should return an array with the value if it is not an array', () => {
        expect(asArray(1)).toEqual([1]);
    });
});

describe('arrayAsyncMap', () => {
    test('should map an array asynchronously', async () => {
        const array = [1, 2, 3];
        const mapper = async (value: number): Promise<number> => value * 2;
        const result = await arrayAsyncMap(array, mapper);
        expect(result).toEqual([2, 4, 6]);
    });
});
