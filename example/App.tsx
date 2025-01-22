import VisionMl from "vision-ml";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { useState } from "react";

export default function App() {
  const [recognizedText, setRecognizedText] = useState<
    {
      text: string;
      confidence: number;
      boundingBox: { x: number; y: number; width: number; height: number };
    }[]
  >([]);

  const handleRecognizeText = async () => {
    try {
      // Load the asset
      const asset = (await Asset.loadAsync(require("./assets/test.png")))[0];

      // Read file as base64
      const base64 = await FileSystem.readAsStringAsync(asset.localUri!, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Recognize text
      const texts = await VisionMl.recognizeText(base64);
      setRecognizedText(texts);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>
        <Group name="Text Recognition">
          <Button title="Recognize Text" onPress={handleRecognizeText} />
          {recognizedText.map((text, index) => (
            <Text key={index}>{JSON.stringify(text, null, 2)}</Text>
          ))}
        </Group>
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  view: {
    flex: 1,
    height: 200,
  },
};
