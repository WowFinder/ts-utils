type OverrideComposer<T> = (base: T, ...overrides: T[]) => T;
interface OverridableBuilder<T> {
    base: T;
    composer: OverrideComposer<T>;
}

class Overridable<T> {
    readonly #base: T;
    readonly #composer: OverrideComposer<T>;

    constructor({ base, composer }: OverridableBuilder<T>) {
        this.#base = base;
        this.#composer = composer;
    }

    compose(...overrides: T[]): T {
        return this.#composer(this.#base, ...overrides);
    }
}

export type { OverridableBuilder, OverrideComposer };
export { Overridable };
