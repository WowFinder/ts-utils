const debugStyleColors = {
    log: '#cfc',
    warn: '#ffc',
    error: '#fcc',
    group: '#ccc',
    trace: '#cff',
    wip: '#fa4',
} as const;

type debugStyleColor = (typeof debugStyleColors)[keyof typeof debugStyleColors];

type debugFunction = (title: string, style?: string, data?: any) => any;

interface DebugCallArguments {
    func: debugFunction;
    title: string;
    color: debugStyleColor;
    data?: any;
}

export { debugStyleColors };
export type { debugStyleColor, debugFunction, DebugCallArguments };
