import { Debugger } from '../base';
import { ConsoleDebugger } from '../ConsoleDebugger';
import { SilentDebugger } from '../SilentDebugger';
import { debugStyleColors } from '../helpers';

const mockDebugCall = jest.fn();
class ConsoleDebuggerTestImpl extends ConsoleDebugger {
    protected debugCall = mockDebugCall;
}

type LogMock = jest.SpyInstance<
    void,
    [message?: any, ...optionalParams: any[]],
    any
>;
type LoglessMock = jest.SpyInstance<void, [label?: string | undefined], any>;

describe('With mocked console', () => {
    let mockedLog: LogMock;
    let mockedTime: LoglessMock;
    let mockedTimeLog: LogMock;
    let mockedTimeEnd: LoglessMock;
    let debuggerImpl: ConsoleDebugger;
    let silentDebuggerImpl: SilentDebugger;

    beforeEach(() => {
        mockedLog = jest.spyOn(console, 'log').mockImplementation(() => {});
        mockedTime = jest.spyOn(console, 'time').mockImplementation(() => {});
        mockedTimeLog = jest
            .spyOn(console, 'timeLog')
            .mockImplementation(() => {});
        mockedTimeEnd = jest
            .spyOn(console, 'timeEnd')
            .mockImplementation(() => {});
        debuggerImpl = new ConsoleDebuggerTestImpl();
        silentDebuggerImpl = new SilentDebugger();
    });

    afterEach(() => {
        mockedLog.mockRestore();
        mockedTime.mockRestore();
        mockedTimeLog.mockRestore();
        mockedTimeEnd.mockRestore();
    });

    it('output', () => {
        debuggerImpl.output('title', 'data');
        expect(mockDebugCall).toHaveBeenCalledWith({
            func: console.log,
            title: 'title',
            data: 'data',
            color: debugStyleColors.log,
        });
    });

    it('error', () => {
        debuggerImpl.error('title', 'data');
        expect(mockDebugCall).toHaveBeenCalledWith({
            func: console.error,
            title: 'title',
            data: 'data',
            color: debugStyleColors.error,
        });
    });

    it('group', () => {
        debuggerImpl.group('title', 'data');
        expect(mockDebugCall).toHaveBeenCalledWith({
            func: console.groupCollapsed,
            title: 'title',
            data: 'data',
            color: debugStyleColors.group,
        });
    });

    it('groupEnd', () => {
        debuggerImpl.groupEnd();
        expect(mockDebugCall).toHaveBeenCalledWith({
            func: console.groupEnd,
            title: '',
            color: debugStyleColors.group,
        });
    });

    it('trace', () => {
        debuggerImpl.trace('title', 'data');
        expect(mockDebugCall).toHaveBeenCalledWith({
            func: console.trace,
            title: 'title',
            data: 'data',
            color: debugStyleColors.trace,
        });
    });

    it('unreachable', () => {
        expect(() => Debugger.unreachable('test' as never)).toThrow(
            'Unreachable code reached: test',
        );
    });

    it('wip', () => {
        debuggerImpl.wip('data');
        expect(mockDebugCall).toHaveBeenCalledWith({
            func: console.warn,
            title: 'WiP',
            data: 'data',
            color: debugStyleColors.wip,
        });
    });

    it('notImplemented', () => {
        debuggerImpl.notImplemented('key');
        expect(mockDebugCall).toHaveBeenCalledWith({
            func: console.error,
            title: 'Not implemented: key',
            data: undefined,
            color: debugStyleColors.error,
        });
    });

    describe('tryOrFallback', () => {
        const fallback = 'fallback';
        it('success', () => {
            const action = jest.fn(() => 'result');
            expect(debuggerImpl.tryOrFallback(action, fallback)).toBe('result');
            expect(action).toHaveBeenCalled();
        });
        it('fallback', () => {
            const action = jest.fn(() => {
                throw new Error('test');
            });
            expect(debuggerImpl.tryOrFallback(action, fallback)).toBe(fallback);
            expect(action).toHaveBeenCalled();
            expect(mockDebugCall).toHaveBeenCalledWith({
                func: console.error,
                title: 'Error: test',
                data: undefined,
                color: debugStyleColors.error,
            });
        });
    });

    it('time', () => {
        debuggerImpl.time('title');
        expect(mockedTime).toHaveBeenCalled();
    });

    it('timeLog', () => {
        debuggerImpl.timeLog('title', 'data');
        expect(mockedTimeLog).toHaveBeenCalledWith('title', 'data');
    });

    it('timeEnd', () => {
        debuggerImpl.timeEnd('title');
        expect(mockedTimeEnd).toHaveBeenCalledWith('title');
    });

    describe('SilentDebugger', () => {
        it('output', () => {
            silentDebuggerImpl.output('title', 'data');
            expect(mockDebugCall).not.toHaveBeenCalled();
            expect(mockedLog).not.toHaveBeenCalled();
        });

        it('time', () => {
            silentDebuggerImpl.time();
            expect(mockedTime).not.toHaveBeenCalled();
        });

        it('timeLog', () => {
            silentDebuggerImpl.timeLog();
            expect(mockedTimeLog).not.toHaveBeenCalled();
        });

        it('timeEnd', () => {
            silentDebuggerImpl.timeEnd();
            expect(mockedTimeEnd).not.toHaveBeenCalled();
        });
    });
});
