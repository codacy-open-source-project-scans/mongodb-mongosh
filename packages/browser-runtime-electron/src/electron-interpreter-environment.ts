import type { Context } from 'vm';
import vm from 'vm';

import type {
  ContextValue,
  InterpreterEnvironment,
} from '@mongosh/browser-runtime-core';

export class ElectronInterpreterEnvironment implements InterpreterEnvironment {
  private context: Context;

  constructor(context: Context) {
    this.context = context;
    vm.createContext(context);
  }

  sloppyEval(code: string): ContextValue {
    return vm.runInContext(code, this.context, { breakOnSigint: true });
  }

  getContextObject(): ContextValue {
    return this.context;
  }
}
