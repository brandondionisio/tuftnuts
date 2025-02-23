// import { StyleSheet } from "react-native";

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
} from "react-native";
import { BlurView } from "expo-blur";
import { useFonts } from 'expo-font';
import { FontAwesome } from "@expo/vector-icons";
const AcornIcon = require("../../assets/images/acorn.png");
const SquirrelIcon = require("../../assets/images/white_squirrel.png");
// const HeaderFont = require("../../assets/fonts/font1.ttf");

const squirrelImage =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2019%2F10%2F559985-squirrel-funny-humor.jpg&f=1&nofb=1&ipt=c6a6e896431605ae43c6772c0fb4ef4d635de2b2f6074ec82d36edcb17e55c65&ipo=images";
const squirrelImage3 =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rd.com%2Fwp-content%2Fuploads%2F2019%2F09%2FGettyImages-1126205831.jpg&f=1&nofb=1&ipt=686936b2d051b019b232b4e0ce24df7ea7a4d42c6eb03e088ce3d9165c04a87d&ipo=images";
const squirrelImage2 =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thespruce.com%2Fthmb%2FE_YJx-xqzUQpLAUtxuYEplVtfOs%3D%2F1500x0%2Ffilters%3Ano_upscale()%3Amax_bytes(150000)%3Astrip_icc()%2Fgetting-squirrels-out-of-your-house-2656316-hero-ddb020f039d14ad9815cf6de682311e9.jpg&f=1&nofb=1&ipt=cbf5e6f84f96312c55fd2de8ab8c08871c3e3065913bbbac2d4dc4a456413b46&ipo=images";

import EditScreenInfo from "@/components/EditScreenInfo";
// import { Text, View } from "@/components/Themed";
type Post = {
  image: string;
  time: string;
  location: string;
  squirrelName: string;
  description: string;
  nuts: number;
};

interface SightingCardProps {
  time: string;
  location: string;
  description: string;
  nuts: number;
  image: string; // URL string for the image
  onLike: () => void;
}

const starterPosts = [
  {
    image: squirrelImage,
    time: "2:18PM",
    location: "Carmichael Hall",
    squirrelName: "Bobby",
    description: "Spotted this beauty outside Carm today",
    nuts: 52,
  },
  {
    image: squirrelImage2,
    time: "11:43PM",
    location: "Dewick Mac-Phie (inside)",
    squirrelName: "Dylan",
    description: "Ummm...there's a squirrel in my herb roasted chicken thigh",
    nuts: 2,
  },
  {
    image: squirrelImage3,
    time: "12:19PM",
    location: "Eaton Hall",
    squirrelName: "Jeffery",
    description: "This guy is eatin' outside Eaton",
    nuts: 59,
  },
];

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>(starterPosts);

  const [fontsLoaded] = useFonts({
    // 'Poppins-Bold': require('../../assets/fonts/'),
    'Header-Font': require("../../assets/fonts/font3.ttf"),
  });
  if (!fontsLoaded) return null;

  useEffect(() => {
    console.log("re-rendering home screen");
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>TuftNuts</Text>
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
              key={post.image}
              image={post.image}
              time={post.time}
              location={post.location}
              description={post.description}
              nuts={post.nuts}
              onLike={() => {
                const newPosts = [...posts];
                newPosts[index].nuts++;
                setPosts(newPosts);
              }}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// Sighting Card Component
const SightingCard: React.FC<SightingCardProps> = ({
  time,
  location,
  description,
  nuts,
  image,
  onLike,
}) => (
  <View style={styles.cardShadow}>
    <View style={styles.card}>
      <ImageBackground source={{ uri: image }} style={styles.squirrelImage}>
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
          {/* fix this so only can like once */}
          <Pressable style={styles.likesContainer} onPress={onLike}>
            <Image style={{ width: 24, height: 24 }} source={AcornIcon} />
            <Text style={styles.likesText}>{nuts}</Text>
          </Pressable>
        </BlurView>
      </ImageBackground>
    </View>
  </View>
);

// Styles
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
    // backgroundColor: "rgba(255, 255, 255, 1)",
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
    // borderTopRadius: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.6)",
  },
  description: {
    flex: 1,
    fontSize: 16,
    // color: '#333',
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
//       <View style={styles.container}>
//         <Text>Hello</Text>
//       </View>

//     // <View style={styles.container}>
//     //   <Text style={styles.title}>TUFT NUTS YAY</Text>
//     //   <View
//     //     style={styles.separator}
//     //     lightColor="#eee"
//     //     darkColor="rgba(255,255,255,0.1)"
//     //   />
//     //   <EditScreenInfo path="app/(tabs)/index.tsx" />
//     // </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: "80%",
//   },
// });
