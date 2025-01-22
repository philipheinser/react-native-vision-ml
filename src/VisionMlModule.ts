import { NativeModule, requireNativeModule } from "expo";

declare class VisionMlModule extends NativeModule {
  recognizeText(path: string): Promise<
    {
      text: string;
      confidence: number;
      boundingBox: { x: number; y: number; width: number; height: number };
    }[]
  >;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<VisionMlModule>("VisionMl");
