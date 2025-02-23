import React from "react";
import IonIcons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import SplashScreenComponent from "../../components/SplashScreen"
import { useEffect, useState } from "react"
import * as SplashScreen from "expo-splash-screen"

function TabBarIcon(props: {
  name: React.ComponentProps<typeof IonIcons>["name"];
  color: string;
}) {
  return <IonIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      try {
        // Prevent Expo from hiding the splash screen automatically
        await SplashScreen.preventAutoHideAsync();

        // Simulate app loading (e.g., load fonts, fetch data)
        await new Promise((resolve) => setTimeout(resolve, 2500));

        setIsAppReady(true);
      } finally {
        // Ensure Expo's splash screen never appears, only hide it when ready
        await SplashScreen.hideAsync();
      }
    }

    prepareApp();
  }, []);

  if (!isAppReady) {
    return <SplashScreenComponent />; // Show only your custom splash screen
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "map" : "map-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: "Post",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "add-circle" : "add-circle-outline"}
              color={color}
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="two"
        options={{
          title: "Post",
          tabBarIcon: ({ color }) => <TabBarIcon name="camera" color={color} />,
        }}
      /> */}
    </Tabs>
  );
}
