type Counter = {
    min: number;
    max: number;
    current: number;
    initial: number;
};

type CounterBuilder = Partial<Counter> & {
    max: number;
};

function mkCounter({
    min = 0,
    max,
    current,
    initial,
}: CounterBuilder): Counter {
    return { min, max, current: current ?? max, initial: initial ?? max };
}

export { type Counter, mkCounter };
