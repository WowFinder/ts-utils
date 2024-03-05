import { ConsoleDebugger } from './ConsoleDebugger';
import { DebugFunction, DebugStyleColor } from './helpers';

class BrowserDebugger extends ConsoleDebugger {
    protected debugCall({
        func,
        title,
        color,
        data,
    }: {
        func: DebugFunction;
        title: string;
        color: DebugStyleColor;
        data?: any;
    }): void {
        const style = `font-weight: bold; background-color: ${color}; color: black`;
        func(`%c ${title} `, style, data);
    }
}

export { BrowserDebugger };
