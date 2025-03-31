const debugStyleColors = {
    log: '#cfc',
    warn: '#ffc',
    error: '#fcc',
    group: '#ccc',
    trace: '#cff',
    wip: '#fa4',
} as const;

type DebugStyleColor = (typeof debugStyleColors)[keyof typeof debugStyleColors];

type DebugFunction = (title: string, style?: string, data?: any) => any;

interface DebugCallArguments {
    func: DebugFunction;
    title: string;
    color: DebugStyleColor;
    data?: any;
}

export { debugStyleColors };
export type { DebugStyleColor, DebugFunction, DebugCallArguments };
