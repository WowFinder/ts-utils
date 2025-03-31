import { ConsoleDebugger } from './ConsoleDebugger';
import { DebugFunction, DebugStyleColor } from './helpers';

/* istanbul ignore next: partially covered by base class, rest relies on unmockable console calls */
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
