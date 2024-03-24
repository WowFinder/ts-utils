import {
    BrowserDebugger,
    ConsoleDebugger,
    SilentDebugger,
    TerminalDebugger,
    Debugger,
} from '../index';

describe('Validate root exports', () => {
    it('BrowserDebugger', () => {
        expect(BrowserDebugger).toBeDefined();
    });

    it('ConsoleDebugger', () => {
        expect(ConsoleDebugger).toBeDefined();
    });

    it('SilentDebugger', () => {
        expect(SilentDebugger).toBeDefined();
    });

    it('TerminalDebugger', () => {
        expect(TerminalDebugger).toBeDefined();
    });

    it('Debugger', () => {
        expect(Debugger).toBeDefined();
    });
});
