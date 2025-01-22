import { registerWebModule, NativeModule } from "expo";

class VisionMlModule extends NativeModule {
  async recognizeText(path: string): Promise<
    {
      text: string;
      confidence: number;
      boundingBox: { x: number; y: number; width: number; height: number };
    }[]
  > {
    throw new Error("Method not implemented on web.");
  }
}

export default registerWebModule(VisionMlModule);
