import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const SplashScreen = () => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ffffff",
    }}
  >
    <Image source={require("../assets/images/squirrel-dancing-squirrel.gif")} />
    {/* whatever you want to display. Eg. image, video, GIF thi line was missing  */}
    <Text style={styles.splashText}>TuftNuts</Text>
  </View>
);

const styles = StyleSheet.create({
  splashText: {
    paddingTop: 10,
    fontSize: 35,
    color: "#417dc1",
  },
});

export default SplashScreen;
