import { ConsoleDebugger } from './ConsoleDebugger';
import { DebugFunction, DebugStyleColor } from './helpers';

class TerminalDebugger extends ConsoleDebugger {
    protected debugCall({
        func,
        title,
        data,
    }: {
        func: DebugFunction;
        title: string;
        color: DebugStyleColor;
        data?: any;
    }): void {
        func(`${title} `, data);
    }
}

export { TerminalDebugger };
