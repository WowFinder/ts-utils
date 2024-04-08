import { asArray } from '../arrays';

describe('asArray', () => {
    test("should return the same reference if it's already an array", () => {
        const alreadyArray = [1, 2, 3];
        expect(asArray(alreadyArray)).toBe(alreadyArray);
    });

    test('should return an array with the value if it is not an array', () => {
        expect(asArray(1)).toEqual([1]);
    });
});
