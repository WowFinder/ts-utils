import { ConsoleDebugger } from './ConsoleDebugger';
import { debugFunction, debugStyleColor } from './helpers';

class TerminalDebugger extends ConsoleDebugger {
    protected debugCall({
        func,
        title,
        data,
    }: {
        func: debugFunction;
        title: string;
        color: debugStyleColor;
        data?: any;
    }): void {
        func(`${title} `, data);
    }
}

export { TerminalDebugger };
