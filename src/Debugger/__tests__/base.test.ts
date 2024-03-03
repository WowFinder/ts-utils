import { Debugger } from '../base';
import { debugStyleColors } from 'Debugger/helpers';

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
});
