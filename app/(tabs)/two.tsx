
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, Image, Alert} from "react-native";
import * as ImagePicker from "expo-image-picker";
import database from "@react-native-firebase/database";

export default function TabTwo() {
  const PhotoLibraryPicker = () => {

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
   
    const openImagePicker = async () => {   
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Please enable photo library access in Settings.");
        return;
      }
  
      // Open gallery
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
  
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    };

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {!selectedImage && <Button title="Pick an Image" onPress={openImagePicker} />}
        {selectedImage && (
          <>
          <Image
            source={{ uri: selectedImage  }}
            style={ styles.image }
          />
          <Button title="Choose New Image" onPress={openImagePicker} />
          </>
        )}
      </View>
    );
  };  

  const TextInputBox = () => {
    const [text, setText] = useState("");

    return (
      <View>
        <TextInput
          style={styles.input}
          placeholder="Type here..."
          value={text}
          onChangeText={setText}
        />
      </View>
    );
  };

  const Form = () => {
    const [formData, setFormData] = useState({
      location: "",
      date: "",
      name: "",
      description: "",
    });

    const handleChange = (key: "location" | "date" | "name" | "description", value: string) => {
      setFormData({ ...formData, [key]: value});
    };

    const handleSubmit = () => {
      if (!formData.location || !formData.date || !formData.name || !formData.description) {
        Alert.alert("Error", "All fields are required!");
        return;
      }

      database()
        .ref("/posts")
        .push()
        .set(formData)
        .then(() => {
          Alert.alert("Success", "Your squirrel was posted!")
          setFormData({ location: "", date: "", name: "", description: "",});
        })
        .catch((error: Error) => {
          console.error(error);
          Alert.alert("Error", "Failed to post :(")
        });
    };

  return (
    <View style={styles.post}>
      <PhotoLibraryPicker />

      <View style={ styles.textInput }>
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
        <Text style={styles.label}>Squirrel's Name </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the squirrel's name"
          value={formData.name}
          onChangeText={(val) => handleChange("name", val)}
          />
        </View>

        <View style={styles.inputRow}>
        <Text style={styles.label}>Description </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={formData.description}
          onChangeText={(val) => handleChange("description", val)}
          />
        </View>

      </View>
      
      <Button title="Post" onPress={handleSubmit} />

    </View>
  );
}
}


// Styles
const styles = StyleSheet.create({
  photoButton: {
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  post: {
    flexDirection: "column",
    marginTop: 15,
    flex: 0.9,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    color: "white",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: 200,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  inputRow: {
    alignSelf: "flex-start",
    marginTop: 20,
    marginLeft: 20,
    flexDirection: "row", // Arrange items in a row
    alignItems: "center", // Align text and input vertically
    marginBottom: 10, // Add spacing
  },
  image: {
    width: 300,
    height: 200,
    marginTop: 15,
  },
  label: {
    fontSize: 17,
    color: "white",
    paddingTop: 10,
  },
  textInput: {
    marginBottom: 30,
    marginLeft: 15,
  },
});