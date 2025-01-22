package expo.modules.visionml

import android.graphics.BitmapFactory
import android.util.Base64
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlin.coroutines.suspendCoroutine

class VisionMlModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("VisionMl")

        AsyncFunction("recognizeText") { base64String: String, promise: Promise ->
                try {
                    val imageBytes = Base64.decode(base64String, Base64.DEFAULT)
                    val bitmap = BitmapFactory.decodeByteArray(imageBytes, 0, imageBytes.size)
                    val image = InputImage.fromBitmap(bitmap, 0)
                    
                    val recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)
                    recognizer.process(image)
                        .addOnSuccessListener { visionText ->
                            val results = visionText.textBlocks.flatMap { block ->
                                block.lines.flatMap { line ->
                                    line.elements.map { element ->
                                        val boundingBox = element.boundingBox
                                        mapOf(
                                            "text" to element.text,
                                            "confidence" to element.confidence,
                                            "boundingBox" to mapOf(
                                                "x" to (boundingBox?.left?.toFloat() ?: 0f),
                                                "y" to (boundingBox?.top?.toFloat() ?: 0f),
                                                "width" to (boundingBox?.width()?.toFloat() ?: 0f),
                                                "height" to (boundingBox?.height()?.toFloat() ?: 0f)
                                            )
                                        )
                                    }
                                }
                            }
                            promise.resolve(results)
                        }
                        .addOnFailureListener { e ->
                            promise.reject("ERR_VISION_ML_TEXT_RECOGNITION_FAILED", "Text recognition failed", e)
                        }
                } catch (e: Exception) {
                    promise.reject("ERR_VISION_ML_TEXT_RECOGNITION_FAILED", "Text recognition failed", e)
                }
            }
        }
}
