import { Debugger } from './base';

class SilentDebugger extends Debugger {
    protected debugCall(): void {
        // non-op
    }

    time(): void {
        // non-op
    }

    timeLog(): void {
        // non-op
    }

    timeEnd(): void {
        // non-op
    }
}

export { SilentDebugger };
