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

export default function Post() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tuft Nuts</Text>
      </View>
      <View style={styles.container}>
        <NewPostForm />
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
