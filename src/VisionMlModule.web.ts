import { registerWebModule, NativeModule } from 'expo';

import { VisionMlModuleEvents } from './VisionMl.types';

class VisionMlModule extends NativeModule<VisionMlModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(VisionMlModule);
