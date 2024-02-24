import { Debugger } from './base';

abstract class ConsoleDebugger extends Debugger {
    protected time(title: string): void {
        console.time(title);
    }

    protected timeLog(title: string, ...data: any[]): void {
        console.timeLog(title, ...data);
    }

    protected timeEnd(title: string): void {
        console.timeEnd(title);
    }
}

export { ConsoleDebugger };
