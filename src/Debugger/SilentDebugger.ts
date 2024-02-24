import { Debugger } from './base';

class SilentDebugger extends Debugger {
    protected debugCall(): void {
        // non-op
    }

    protected time(): void {
        // non-op
    }

    protected timeLog(): void {
        // non-op
    }

    protected timeEnd(): void {
        // non-op
    }
}

export { SilentDebugger };
