import ExpoModulesCore
import Vision
import UIKit

public class VisionMlModule: Module {
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('VisionMl')` in JavaScript.
    Name("VisionMl")

    // Defines a JavaScript function for text recognition
      AsyncFunction("recognizeText") { (base64String: String) -> [[String: Any]] in
      guard let imageData = Data(base64Encoded: base64String),
            let image = UIImage(data: imageData),
            let cgImage = image.cgImage else {
        throw NSError(domain: "VisionMl", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid image data"])
      }
      
      let request = VNRecognizeTextRequest()
          let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
      
      try handler.perform([request])
      
      guard let observations = request.results else {
        return []
      }
      
      return observations.compactMap { observation in
          [
            "text": observation.topCandidates(1).first?.string ?? "",
           "confidence": observation.confidence,
            "boundingBox": ["x":observation.boundingBox.origin.x,"y":observation.boundingBox.origin.y,"width":observation.boundingBox.size.width,"height":observation.boundingBox.size.height]
          ]
      }
    }
  }
}
