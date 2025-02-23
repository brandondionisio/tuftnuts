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
import { getAllUsers } from "../../firebase.js";
const AcornIcon = require("../../assets/images/acorn.png");
const AcornLikeIcon = require("../../assets/images/acorn-like.png");
const SquirrelIcon = require("../../assets/images/white_squirrel.png");
// const HeaderFont = require("../../assets/fonts/font1.ttf");

const squirrelImage =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2019%2F10%2F559985-squirrel-funny-humor.jpg&f=1&nofb=1&ipt=c6a6e896431605ae43c6772c0fb4ef4d635de2b2f6074ec82d36edcb17e55c65&ipo=images";
const squirrelImage3 =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rd.com%2Fwp-content%2Fuploads%2F2019%2F09%2FGettyImages-1126205831.jpg&f=1&nofb=1&ipt=686936b2d051b019b232b4e0ce24df7ea7a4d42c6eb03e088ce3d9165c04a87d&ipo=images";
const squirrelImage2 =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thespruce.com%2Fthmb%2FE_YJx-xqzUQpLAUtxuYEplVtfOs%3D%2F1500x0%2Ffilters%3Ano_upscale()%3Amax_bytes(150000)%3Astrip_icc()%2Fgetting-squirrels-out-of-your-house-2656316-hero-ddb020f039d14ad9815cf6de682311e9.jpg&f=1&nofb=1&ipt=cbf5e6f84f96312c55fd2de8ab8c08871c3e3065913bbbac2d4dc4a456413b46&ipo=images";

type Post = {
  id: string;
  image: string;
  time: string;
  location: string;
  squirrelName: string;
  description: string;
  nuts: number;
  liked?: boolean; // add a liked property
};

interface SightingCardProps {
  time: string;
  location: string;
  name: string;
  description: string;
  nuts: number;
  image: string;
  liked: boolean;
  onLike: () => void;
}

const starterPosts: Post[] = [
  {
    id: "1",
    image: squirrelImage,
    time: "2:18PM",
    location: "Carmichael Hall",
    squirrelName: "Bobby",
    description: "Spotted this beauty outside Carm today",
    nuts: 52,
    liked: false,
  },
  {
    id: "2",
    image: squirrelImage2,
    time: "11:43PM",
    location: "Dewick Mac-Phie (inside)",
    squirrelName: "Dylan",
    description: "Ummm...there's a squirrel in my herb roasted chicken thigh",
    nuts: 2,
    liked: false,
  },
  {
    id: "3",
    image: squirrelImage3,
    time: "12:19PM",
    location: "Eaton Hall",
    squirrelName: "Jeffery",
    description: "This guy is eatin' outside Eaton",
    nuts: 59,
    liked: false,
  },
];

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>(starterPosts);

  const [fontsLoaded] = useFonts({
    // 'Poppins-Bold': require('../../assets/fonts/'),
    "Header-Font": require("../../assets/fonts/font3.ttf"),
  });
  if (!fontsLoaded) return null;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllUsers();
        // console.log("DATA after fetch: ", data);
        // If getAllUsers returns null, you can set it to an empty array.
        setPosts(data || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
    console.log("re-rendering home screen");
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Tuft Nuts</Text>
        </View>

        {/* Nut Count Section */}
        <View style={styles.cardShadow}>
          <View style={styles.nutCountContainer}>
            <View style={styles.nutIcon}>
              <Image style={{ width: 50, height: 50 }} source={SquirrelIcon} />
              {/* <FontAwesome name="tree" size={28} color="black" /> */}
            </View>
            <View style={styles.nutTextContainer}>
              <Text style={styles.nutLabel}>SQUIRRELS SPOTTED</Text>
              <Text style={styles.nutCount}>428</Text>
            </View>
          </View>
        </View>

        {/* Scrollable Squirrel Sightings */}
        <ScrollView>
          {posts.map((post, index) => (
            <SightingCard
              key={post.id}
              image={post.image}
              time={post.time}
              location={post.location}
              name={post.squirrelName}
              description={post.description}
              nuts={post.nuts}
              liked={!!post.liked}
              onLike={() => {
                const newPosts = [...posts];
                if (newPosts[index].liked) {
                  // If already liked, remove the like
                  newPosts[index].liked = false;
                  newPosts[index].nuts = Math.max(newPosts[index].nuts - 1, 0);
                } else {
                  // Otherwise, add a like
                  newPosts[index].liked = true;
                  newPosts[index].nuts++;
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
  nuts,
  image,
  liked,
  name,
  onLike,
}) => (
  <View style={styles.cardShadow}>
    <View style={styles.card}>
      <ImageBackground source={{ uri: image }} style={styles.squirrelImage}>
        {/* Top bar for the squirrel's name */}
        <View style={styles.topBar}>
          <Text style={styles.topBarText}>{name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <BlurView intensity={20} tint="light" style={styles.infoBadge}>
            <Text style={styles.infoText}>{time}</Text>
          </BlurView>
          <BlurView intensity={20} tint="light" style={styles.infoBadge}>
            <Text style={styles.infoText}>{location}</Text>
          </BlurView>
        </View>
        <BlurView intensity={50} tint="light" style={styles.cardFooter}>
          <Text style={styles.description}>{description}</Text>
          <Pressable style={styles.likesContainer} onPress={onLike}>
            {liked && (
              <Image style={{ width: 24, height: 24 }} source={AcornLikeIcon} />
            )}
            {!liked && (
              <Image style={{ width: 24, height: 24 }} source={AcornIcon} />
            )}
            <Text style={styles.likesText}>{nuts}</Text>
          </Pressable>
        </BlurView>
      </ImageBackground>
    </View>
  </View>
);

const styles = StyleSheet.create({
  // bgImage: {
  //   width: '100%',
  //   height: '100%',
  //   flex: 1,
  //   resizeMode: 'cover',
  //   justifyContent: 'center',
  // },
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
    margin: 10,
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
  topBar: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  topBarText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
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
});
