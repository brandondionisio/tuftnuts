import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  ImageBackground,
  Alert,
  Pressable,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

export default function TabTwo() {
  // PhotoLibraryPicker Component
  const PhotoLibraryPicker = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    const openImagePicker = async () => {
      // Request permission
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please enable photo library access in Settings."
        );
        return;
      }

      const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();
      if (mediaLibraryStatus !== "granted") {
        Alert.alert("Permission Denied", "Please enable media library access.");
        return;
      }

      // Open gallery
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri
        console.log("Image URI:", imageUri);
        setSelectedImage(imageUri);

        try {
          let asset = await MediaLibrary.createAssetAsync(imageUri);

          if (!asset || !asset.id) {
            console.error("Error: Asset is null or undefined");
            Alert.alert("Error", "Could not save image to media library.");
            return;
          }

          const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);

          if (assetInfo?.location) {
            setLocation({
              latitude: assetInfo.location.latitude,
              longitude: assetInfo.location.longitude,
            });
            console.log("Image Location:", assetInfo.location);
          } else {
            console.log("No location data available.");
          } 
        } catch (error) {
          console.error("Error retrieving asset info:", error);
        }
      }
    }

    return (
      <View style={styles.centerContainer}>
        {!selectedImage ? (
          <Button title="Pick an Image" onPress={openImagePicker} />
        ) : (
          <>
            <Image source={{ uri: selectedImage }} style={styles.image} />
            <Button title="Choose New Image" onPress={openImagePicker} />
          </>
        )}
      </View>
    );
  };

  // TextInputBox Component
  const TextInputBox = () => {
    const [text, setText] = useState("");
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type here..."
          value={text}
          onChangeText={setText}
        />
      </View>
    );
  };

  // Form Component
  const Form = () => {
    const [formData, setFormData] = useState({
      location: "",
      date: "",
      name: "",
      description: "",
    });

    const handleChange = (
      key: "location" | "date" | "name" | "description",
      value: string
    ) => {
      setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = () => {
      if (
        !formData.location ||
        !formData.date ||
        !formData.name ||
        !formData.description
      ) {
        Alert.alert("Error", "All fields are required!");
        return;
      }

      // Here you would typically write the data to your backend or Firebase.
      Alert.alert("Success", "Your squirrel was posted!");
      setFormData({ location: "", date: "", name: "", description: "" });
    };

    return (
      <ScrollView contentContainerStyle={styles.formContainer}>
        <PhotoLibraryPicker />
        <View style={styles.inputRow}>
          <Text style={styles.label}>Location: </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter location"
            value={formData.location}
            onChangeText={(val) => handleChange("location", val)}
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Date: </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter date"
            value={formData.date}
            onChangeText={(val) => handleChange("date", val)}
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Squirrel's Name: </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the squirrel's name"
            value={formData.name}
            onChangeText={(val) => handleChange("name", val)}
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Description: </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter description"
            value={formData.description}
            onChangeText={(val) => handleChange("description", val)}
          />
        </View>
        <Button title="Post" onPress={handleSubmit} />
      </ScrollView>
    );
  };

  // Return the Form component so that something is displayed in the "Post" tab.
  return <Form />;
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputContainer: {
    marginVertical: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginRight: 5,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    width: 200,
    backgroundColor: "#fff",
  },
  image: {
    width: 300,
    height: 200,
    marginTop: 15,
  },
});