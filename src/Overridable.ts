interface OverridableBuilder<T> {
    base: T;
    composer: (base: T, ...overrides: T[]) => T;
}

class Overridable<T> {
    #base: T;
    #composer: (base: T, ...overrides: T[]) => T;

    constructor({ base, composer }: OverridableBuilder<T>) {
        this.#base = base;
        this.#composer = composer;
    }

    compose(...overrides: T[]): T {
        return this.#composer(this.#base, ...overrides);
    }
}

export type { OverridableBuilder };
export { Overridable };
