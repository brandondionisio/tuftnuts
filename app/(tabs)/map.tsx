import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import { writePostData, getAllUserCoordinates } from "../../firebase";
import { Text, View } from "@/components/Themed";
import { Button } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

type Coordinate = {
  latitude: number;
  longitude: number;
  squirrel_name: string;
};

export default function TabOneScreen() {
  const [markers, setMarkers] = useState<Coordinate[]>([]);

  useEffect(() => {
    // Fetch marker data when the component mounts.
    getAllUserCoordinates()
      .then((coords) => {
        console.log("COORDS ARE: ", coords);
        // Expecting coords to be an array of objects like:
        // [{ latitude: 42.4078, longitude: -71.1192, ... }, ...]
        if (coords) {
          setMarkers(coords);
        }
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Define the initial region centered at Tufts University
  const initialRegion = {
    latitude: 42.4078,
    longitude: -71.1192,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.00521,
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        provider={PROVIDER_DEFAULT}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            tracksViewChanges={false}
            title={marker.squirrel_name}
            image={require("../../assets/images/squirrel-svgrepo-com.png")}
          ></Marker>
        ))}
      </MapView>
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
