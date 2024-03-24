import { Debugger } from './base';

abstract class ConsoleDebugger extends Debugger {
    time(title: string): void {
        console.time(title);
    }

    timeLog(title: string, ...data: any[]): void {
        console.timeLog(title, ...data);
    }

    timeEnd(title: string): void {
        console.timeEnd(title);
    }
}

export { ConsoleDebugger };
