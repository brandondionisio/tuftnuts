import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
  Pressable,
  Keyboard,
} from "react-native";
import { writePostData } from "@/firebase";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as MediaLibrary from "expo-media-library";

export default function NewPostForm() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const openImagePicker = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Please enable photo library access in Settings."
      );
      return;
    }

    // Open gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    // result.assets[0].uri
    // result

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      console.log("Image URI: ", imageUri);
      setSelectedImage(imageUri);

      try {
        let asset = await MediaLibrary.createAssetAsync(imageUri);

        if (!asset || !asset.id) {
          console.error("Error: Asset is null or undefined");
          Alert.alert("Error", "Count not save image to media library.");
          return;
        }

        const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);

        if (assetInfo?.location) {
          console.log("Photo latitude: ", assetInfo.location.latitude);
          console.log("Photo longitude: ", assetInfo.location.longitude);
          setLocation({
            latitude: assetInfo.location.latitude,
            longitude: assetInfo.location.longitude,
          });
          console.log("Image Location:", assetInfo.location);
        } else {
          console.log("No location data available.");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const [formData, setFormData] = useState({
    location: "",
    name: "",
    description: "",
  });

  const handleChange = (
    key: "location" | "name" | "description",
    value: string
  ) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    if (!formData.location || !formData.name || !formData.description) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    writePostData(
      formData.name,
      formData.description,
      formData.location,
      location?.latitude,
      location?.longitude,
      selectedImage,
      0
    );

    Alert.alert("Success", "Your squirrel was posted!");
    setFormData({ location: "", name: "", description: "" });
    setSelectedImage(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled"> */}
      <View style={styles.formContainer}>
        {/* <PhotoLibraryPicker /> */}
        <View style={styles.textBox}>
          {/* <Text style={styles.label}>Location: </Text> */}
          <TextInput
            style={styles.input}
            placeholder="Location"
            placeholderTextColor={"#b8bbbf"}
            value={formData.location}
            onChangeText={(val) => handleChange("location", val)}
          />
        </View>

        <View style={styles.textBox}>
          {/* <Text style={styles.label}>Squirrel's Name: </Text> */}
          <TextInput
            style={styles.input}
            placeholder="Squirrel's Name"
            placeholderTextColor={"#b8bbbf"}
            value={formData.name}
            onChangeText={(val) => handleChange("name", val)}
          />
        </View>
        <View style={styles.textBox}>
          {/* <Text style={styles.label}>Description: </Text> */}
          <TextInput
            style={styles.input}
            placeholder="Enter description"
            placeholderTextColor={"#b8bbbf"}
            value={formData.description}
            onChangeText={(val) => handleChange("description", val)}
          />
        </View>

        <View style={styles.centerContainer}>
          {!selectedImage ? (
            <Pressable style={styles.photoChoice} onPress={openImagePicker}>
              <View style={styles.cardShadow}>
                <View style={styles.card}>
                  <ImageBackground style={styles.addImage} resizeMode="cover">
                    <Ionicons
                      size={80}
                      name="add-circle"
                      color="lightgray"
                    ></Ionicons>
                  </ImageBackground>
                </View>
              </View>
            </Pressable>
          ) : (
            // <Button title="Pick an Image" onPress={openImagePicker} />
            <Pressable style={styles.photoChoice} onPress={openImagePicker}>
              <View style={styles.cardShadow}>
                <View style={styles.card}>
                  <ImageBackground
                    source={{ uri: selectedImage }}
                    style={styles.squirrelImage}
                    resizeMode="cover"
                  >
                    <View style={styles.infoContainer}>
                      <BlurView
                        intensity={20}
                        tint="light"
                        style={styles.selectNew}
                      >
                        <Text style={styles.infoText}>Select a New Image</Text>
                      </BlurView>
                    </View>
                  </ImageBackground>
                </View>
              </View>
            </Pressable>
          )}
          {/* <NewPostForm /> */}
        </View>
        <Pressable onPress={handleSubmit}>
          <View style={styles.infoContainer}>
            <View style={styles.infoBadge}>
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                POST
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
      {/* </ScrollView> */}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    // height: 400,
  },
  formContainer: {
    flexGrow: 1,
    marginTop: 15,
    //   padding: 20,
    //   alignItems: "center",
    //   justifyContent: "center",
  },
  input: {
    height: 35,
    paddingHorizontal: 10,
    width: 300,
  },
  textBox: {
    backgroundColor: "white", // Updated to white background
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#707a8a", // Updated to gray border
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  infoText: {
    fontSize: 14,
    color: "black",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  infoBadge: {
    // backgroundColor: '#D3D3D3',
    // backgroundColor: "rgba(0, 0, 0, 0.3)",
    backgroundColor: "#5c2c06",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 45,
    borderColor: "gray",
    padding: 5,
    borderRadius: 30,
    borderWidth: 1,
    // borderColor: "rgba(0, 0, 0, 0.3)",
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 6,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#fff",
    backgroundColor: "white",
    paddingVertical: 20,
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  photoChoice: {
    // flexDirection: "row",
    backgroundColor: "white",
    // margin: 10,
    // padding: 15,
    borderRadius: 15,
    margin: 30,
    alignItems: "center",
  },
  cardShadow: {
    // margin: 10,
    borderRadius: 15,
    backgroundColor: "transparent",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  addImage: {
    width: 250,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  squirrelImage: {
    width: 250,
    height: 250,
    paddingBottom: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFF",
    // backgroundColor: "rgba(255, 255, 255, 1)",
    // margin: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  selectNew: {
    // backgroundColor: '#D3D3D3',
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    overflow: "hidden",
  },
});
