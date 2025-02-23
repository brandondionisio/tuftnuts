import { StyleSheet } from "react-native";
import { writePostData, getAllUsers } from "../../firebase";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Button } from "react-native";
// import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

export default function TabOneScreen() {
  // const initialRegion = {
  //   latitude: 37.78825,
  //   longitude: -122.4324,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // };

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
      {/* <MapView style={styles.map}></MapView> */}
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
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
});
