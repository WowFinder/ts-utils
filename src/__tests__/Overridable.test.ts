import { Overridable } from '../Overridable';

describe('Overridable', () => {
    it('should compose the base and the overrides', () => {
        const base = { a: 1, b: 2 };
        const overrides = { b: 3, c: 4 };
        // eslint-disable-next-line misc/no-shadow
        const composer = jest.fn((base, ...overrides) => ({
            ...base,
            ...Object.assign({}, ...overrides),
        }));
        const overridable = new Overridable({ base, composer });

        const result = overridable.compose(overrides);

        expect(result).toEqual({ a: 1, b: 3, c: 4 });
        expect(composer).toHaveBeenCalledWith(base, overrides);
    });
});
