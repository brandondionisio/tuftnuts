import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  Alert,
  Pressable,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

import NewPostForm from "../../components/post_form";

// const PhotoLibraryPicker = () => {
//   // const addPhotoImage = "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F-H2sYChCU-Tg%2FTaxiz20sxCI%2FAAAAAAAABbc%2FDUXa8sEtYlM%2Fs1600%2Fred%2Bsquirrel.jpg&f=1&nofb=1&ipt=cc5a88adf04dd54350b53d013e12193041ea4bea3e0b1187638a818c1d568cf3&ipo=images"
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   const openImagePicker = async () => {
//     // Request permission
//     const { status } =
//       await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert(
//         "Permission Denied",
//         "Please enable photo library access in Settings."
//       );
//       return;
//     }

//     // Open gallery
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: false,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setSelectedImage(result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={styles.centerContainer}>
//       {!selectedImage ? (
//         <Pressable style={styles.photoChoice} onPress={openImagePicker}>
//           <View style={styles.cardShadow}>
//             <View style={styles.card}>
//               <ImageBackground source={{ uri: AddImage }} style={styles.addImage} resizeMode="cover">
//                 <Ionicons size={80} name="add-circle" color="lightgray"></Ionicons>
//               </ImageBackground>
//             </View>
//           </View>
//         </Pressable>
//         // <Button title="Pick an Image" onPress={openImagePicker} />
//       ) : (
//         <>
//           {/* <Image source={{ uri: selectedImage }} style={styles.image} /> */}
//           <Pressable style={styles.photoChoice} onPress={openImagePicker}>
//           <View style={styles.cardShadow}>
//             <View style={styles.card}>
//               <ImageBackground source={{ uri: selectedImage }} style={styles.squirrelImage} resizeMode="cover">
//                 <View style={styles.infoContainer}>
//                   <BlurView intensity={20} tint="light" style={styles.infoBadge}>
//                     <Text style={styles.infoText}>Select a New Image</Text>
//                   </BlurView>
//                 </View>
//               </ImageBackground>
//             </View>
//           </View>
//         </Pressable>
//           {/* <Button title="Choose New Image" onPress={openImagePicker} /> */}
//         </>
//       )}
//       {/* <NewPostForm /> */}
//     </View>
//   );
// };

export default function Post() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TuftNuts</Text>
      </View>
      <View style={styles.container}>
        <NewPostForm />
        {/* <PhotoLibraryPicker /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#5c2c06",
  },
  header: {
    backgroundColor: "#5c2c06",
    padding: 5,
    alignItems: "center",
  },
  headerText: {
    fontSize: 85,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Header-Font",
    letterSpacing: 3,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#fff",
    backgroundColor: 'white',
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
    marginBottom: 30,
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
    alignItems: "center"
  },
  squirrelImage: {
    width: 250,
    height: 250,
    paddingBottom: 10,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  card: {
    backgroundColor: "#FFF",
    // backgroundColor: "rgba(255, 255, 255, 1)",
    // margin: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  infoBadge: {
    // backgroundColor: '#D3D3D3',
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    overflow: "hidden",
  },
  infoText: {
    fontSize: 14,
    // color: '#333',
    color: "black",
    // color: 'white'
  },
});
