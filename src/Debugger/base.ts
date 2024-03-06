import { DebugCallArguments, debugStyleColors } from './helpers';

abstract class Debugger {
    static unreachable(value?: never): never {
        throw new Error(`Unreachable code reached: ${value}`);
    }

    protected abstract debugCall({
        func,
        title,
        color,
        data,
    }: DebugCallArguments): void;

    protected abstract time(title: string): void;
    protected abstract timeLog(title: string, ...data: any[]): void;
    protected abstract timeEnd(title: string): void;

    output(title: string, data?: any): void {
        this.debugCall({
            func: console.log,
            title,
            data,
            color: debugStyleColors.log,
        });
    }

    error(title: string, data?: any): void {
        this.debugCall({
            func: console.error,
            title,
            data,
            color: debugStyleColors.error,
        });
    }

    group(title: string, data?: any): void {
        this.debugCall({
            func: console.groupCollapsed,
            title,
            data,
            color: debugStyleColors.group,
        });
    }

    groupEnd(): void {
        this.debugCall({
            func: console.groupEnd,
            title: '',
            color: debugStyleColors.group,
        });
    }

    trace(title: string, data?: any): void {
        this.debugCall({
            func: console.trace,
            title,
            data,
            color: debugStyleColors.trace,
        });
    }

    // untestable by Jest due to the nature of the debugger statement
    /* istanbul ignore next */
    breakpoint(): void {
        // eslint-disable-next-line no-debugger
        debugger;
    }

    wip(data?: any): void {
        this.debugCall({
            func: console.warn,
            title: 'WiP',
            data,
            color: debugStyleColors.wip,
        });
    }

    notImplemented(key: string): void {
        this.error(`Not implemented: ${key}`);
    }

    tryOrFallback<T>(action: () => T, fallback: T): T {
        try {
            return action();
        } catch (ex: any) {
            this.error(`${ex}`);
            return fallback;
        }
    }
}

export { Debugger };
