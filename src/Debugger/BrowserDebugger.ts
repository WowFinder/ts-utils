import { ConsoleDebugger } from './ConsoleDebugger';
import { debugFunction, debugStyleColor } from './helpers';

class BrowserDebugger extends ConsoleDebugger {
    protected debugCall({
        func,
        title,
        color,
        data,
    }: {
        func: debugFunction;
        title: string;
        color: debugStyleColor;
        data?: any;
    }): void {
        const style = `font-weight: bold; background-color: ${color}; color: black`;
        func(`%c ${title} `, style, data);
    }
}

export { BrowserDebugger };
