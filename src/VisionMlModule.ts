import { NativeModule, requireNativeModule } from 'expo';

import { VisionMlModuleEvents } from './VisionMl.types';

declare class VisionMlModule extends NativeModule<VisionMlModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<VisionMlModule>('VisionMl');
