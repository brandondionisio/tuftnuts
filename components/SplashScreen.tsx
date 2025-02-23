import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

export default function SplashScreen() {
      const [fontsLoaded] = useFonts({
        // 'Poppins-Bold': require('../../assets/fonts/'),
        "Header-Font": require("../assets/fonts/font3.ttf"),
      });
      if (!fontsLoaded) return null;

      return (
        <View style={styles.splashContainer}>
            <Image source={require("../assets/images/squirrel-dancing-squirrel.gif")} />
            {/* whatever you want to display. Eg. image, video, GIF thi line was missing  */}
            <Text style={styles.splashText}>Tuft Nuts</Text>
        </View>
      )
}

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
    },
    splashText: {
        fontFamily: "Header-Font",
        paddingTop: 10,
        fontSize: 60,
        color: "#417dc1",
    },
});