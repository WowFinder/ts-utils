import { Debugger } from '../base';
import { debugStyleColors } from '../helpers';

const mocks = {
    debugCall: jest.fn(),
    time: jest.fn(),
    timeLog: jest.fn(),
    timeEnd: jest.fn(),
};

class DebuggerTestImpl extends Debugger {
    protected debugCall = mocks.debugCall;
    protected time = mocks.time;
    protected timeLog = mocks.timeLog;
    protected timeEnd = mocks.timeEnd;
}

describe('Debugger', () => {
    let debuggerImpl: DebuggerTestImpl;

    beforeEach(() => {
        debuggerImpl = new DebuggerTestImpl();
    });

    it('output', () => {
        debuggerImpl.output('title', 'data');
        expect(mocks.debugCall).toHaveBeenCalledWith({
            func: console.log,
            title: 'title',
            data: 'data',
            color: debugStyleColors.log,
        });
    });

    it('error', () => {
        debuggerImpl.error('title', 'data');
        expect(mocks.debugCall).toHaveBeenCalledWith({
            func: console.error,
            title: 'title',
            data: 'data',
            color: debugStyleColors.error,
        });
    });

    it('group', () => {
        debuggerImpl.group('title', 'data');
        expect(mocks.debugCall).toHaveBeenCalledWith({
            func: console.groupCollapsed,
            title: 'title',
            data: 'data',
            color: debugStyleColors.group,
        });
    });

    it('groupEnd', () => {
        debuggerImpl.groupEnd();
        expect(mocks.debugCall).toHaveBeenCalledWith({
            func: console.groupEnd,
            title: '',
            color: debugStyleColors.group,
        });
    });

    it('trace', () => {
        debuggerImpl.trace('title', 'data');
        expect(mocks.debugCall).toHaveBeenCalledWith({
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
        expect(mocks.debugCall).toHaveBeenCalledWith({
            func: console.warn,
            title: 'WiP',
            data: 'data',
            color: debugStyleColors.wip,
        });
    });

    it('notImplemented', () => {
        debuggerImpl.notImplemented('key');
        expect(mocks.debugCall).toHaveBeenCalledWith({
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
            expect(mocks.debugCall).toHaveBeenCalledWith({
                func: console.error,
                title: 'Error: test',
                data: undefined,
                color: debugStyleColors.error,
            });
        });
    });
});
