import { mkCounter } from '../Counter';

describe('mkCounter', () => {
    test('should create a counter with default values', () => {
        const counter = mkCounter({ max: 10 });
        expect(counter).toEqual({ min: 0, max: 10, current: 10, initial: 10 });
    });

    test('should create a counter with custom values', () => {
        const counter = mkCounter({
            min: 5,
            max: 15,
            current: 10,
            initial: 12,
        });
        expect(counter).toEqual({ min: 5, max: 15, current: 10, initial: 12 });
    });
});
