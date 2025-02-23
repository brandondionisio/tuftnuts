import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import { BlurView } from "expo-blur";
import { getAllUsers, getUserCount } from "../../firebase.js";
const AcornIcon = require("../../assets/images/acorn.png");
const AcornLikeIcon = require("../../assets/images/acorn-like.png");
const SquirrelIcon = require("../../assets/images/white_squirrel.png");

type Post = {
  id: string;
  image: string;
  time: string;
  location: string;
  squirrelName: string;
  description: string;
  nut_count: number;
  liked?: boolean;
};

interface SightingCardProps {
  time: string;
  location: string;
  name: string;
  description: string;
  nut_count: number;
  image: string;
  liked: boolean;
  onLike: () => void;
}

export default function HomeScreen() {
  const formatDateTime = (dateString: string) => {
    const [datePart, timePart] = dateString.split(", ");
    if (!datePart || !timePart) return "Invalid Date";
    const newDatePart = datePart.slice(0, -5);
    const timeOfDay = timePart.slice(-2);
    const newTimePart = timePart.slice(0, -6);
    return `${newDatePart}, ${newTimePart}${timeOfDay}`;
  };

  const [posts, setPosts] = useState<Post[]>([]);
  const [squirrelCount, setSquirrelCount] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Create a fetchPosts function that can be reused
  const fetchPosts = async () => {
    try {
      const data = await getAllUsers();
      const squirrel_count = await getUserCount();
      console.log("DATA after fetch: ", data);
      setPosts(data || []);
      setSquirrelCount(String(squirrel_count));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    console.log("re-rendering home screen");
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const [fontsLoaded] = useFonts({
    "Header-Font": require("../../assets/fonts/font3.ttf"),
  });
  if (!fontsLoaded) return <Text>Font loading...</Text>;

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Tuft Nuts</Text>
        </View>

        {/* Nut Count Section with Refresh Button wrapped in a shadow card */}
        <View style={styles.cardShadow}>
          <View style={styles.nutCountContainer}>
            <View style={styles.nutIcon}>
              <Image style={{ width: 50, height: 50 }} source={SquirrelIcon} />
            </View>
            <View style={styles.nutTextContainer}>
              <Text style={styles.nutLabel}>SQUIRRELS SPOTTED</Text>
              <Text style={styles.nutCount}>{squirrelCount}</Text>
            </View>
            <Pressable
              onPress={handleRefresh}
              style={styles.smallRefreshButton}
            >
              <Text style={styles.smallRefreshButtonText}>
                {refreshing ? "⟳" : "⟳"}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Scrollable Squirrel Sightings */}
        <ScrollView>
          {posts.map((post, index) => (
            <SightingCard
              key={post.id}
              image={post.image}
              time={formatDateTime(post.time)}
              location={post.location}
              name={post.squirrelName}
              description={post.description}
              nut_count={post.nut_count}
              liked={!!post.liked}
              onLike={() => {
                const newPosts = [...posts];
                if (newPosts[index].liked) {
                  newPosts[index].liked = false;
                  newPosts[index].nut_count = Math.max(
                    newPosts[index].nut_count - 1,
                    0
                  );
                } else {
                  newPosts[index].liked = true;
                  newPosts[index].nut_count++;
                }
                setPosts(newPosts);
              }}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const SightingCard: React.FC<SightingCardProps> = ({
  time,
  location,
  description,
  nut_count,
  image,
  liked,
  name,
  onLike,
}) => (
  <View style={styles.cardShadow}>
    <View style={styles.card}>
      <ImageBackground source={{ uri: image }} style={styles.squirrelImage}>
        <View style={styles.infoContainer}>
          <BlurView intensity={20} tint="light" style={styles.infoBadge}>
            <Text style={styles.infoText}>{name}</Text>
          </BlurView>
          <BlurView intensity={20} tint="light" style={styles.infoBadge}>
            <Text style={styles.infoText}>{location}</Text>
          </BlurView>
        </View>
        <View style={styles.dateTimeContainer}>
          <BlurView intensity={20} tint="light" style={styles.infoBadge}>
            <Text style={styles.infoText}>{time}</Text>
          </BlurView>
        </View>
        <BlurView intensity={50} tint="light" style={styles.cardFooter}>
          <Text style={styles.description}>{description}</Text>
          <Pressable style={styles.likesContainer} onPress={onLike}>
            {liked ? (
              <Image style={{ width: 24, height: 24 }} source={AcornLikeIcon} />
            ) : (
              <Image style={{ width: 24, height: 24 }} source={AcornIcon} />
            )}
            <Text style={styles.likesText}>{nut_count}</Text>
          </Pressable>
        </BlurView>
      </ImageBackground>
    </View>
  </View>
);

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#5c2c06",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
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
  nutCountContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  nutIcon: {
    backgroundColor: "#5c2c06",
    padding: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  nutTextContainer: {
    flex: 1,
    alignItems: "center",
  },
  nutLabel: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  nutCount: {
    fontSize: 32,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#FFF",
    margin: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  cardShadow: {
    margin: 10,
    borderRadius: 15,
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 10,
  },
  infoBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    overflow: "hidden",
  },
  infoText: {
    fontSize: 14,
    color: "black",
  },
  squirrelImage: {
    width: "100%",
    height: 300,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.6)",
  },
  description: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  likesText: {
    marginLeft: 5,
    fontSize: 18,
    color: "black",
  },
  // Styles for the small refresh button
  smallRefreshButton: {
    backgroundColor: "#5c2c06",
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  smallRefreshButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
