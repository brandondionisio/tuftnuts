import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import { writePostData, getAllUsers } from "../../firebase";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Button } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

export default function TabOneScreen() {
  // Define the initial region centered at Tufts University
  const initialRegion = {
    latitude: 42.4078,
    longitude: -71.1192,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.00521,
  };

  return (
    <View style={styles.container}>
      <Text className="text-red-500">TUFT NUTS YAY</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button
        title="Test Write to Firebase"
        onPress={() =>
          writePostData(
            "NuttyBuddy",
            "He stole my lunch",
            "Tisch Library",
            "DEMO_URL",
            0
          )
        }
      />
      <Button
        title="Test getting all users"
        onPress={() => console.log(getAllUsers())}
      />
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        provider={PROVIDER_DEFAULT}
      >
        <Marker coordinate={{ latitude: 42.4078, longitude: -71.1192 }}>
          <Image
            source={require("../../assets/images/squirrel-svgrepo-com.png")}
            style={styles.squirrel}
          />
        </Marker>
      </MapView>
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  squirrel: {
    width: 25,
    height: 25,
  },
});
