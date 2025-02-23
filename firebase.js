import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getDatabase, ref, set, runTransaction, get } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkQmJyZro8RW3G2YbHZz9OC0vbASeOYOI",
  authDomain: "tuftnuts.firebaseapp.com",
  projectId: "tuftnuts",
  storageBucket: "tuftnuts.firebasestorage.app",
  messagingSenderId: "874130826983",
  appId: "1:874130826983:web:21d249c231ca0b5b3b6442",
  measurementId: "G-19JRY3ZQQN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Only initialize analytics if in a browser environment
let analytics;
if (typeof window !== "undefined") {
    isSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    });
  }

// Function to get the next auto-incremented user ID
function getNextUserId(db, callback) {
  const counterRef = ref(db, "usersCounter");
  runTransaction(counterRef, (currentValue) => {
    return (currentValue || 0) + 1;
  })
    .then((result) => {
      if (result.committed) {
        const newId = result.snapshot.val();
        callback(newId);
      } else {
        console.error("Transaction not committed");
      }
    })
    .catch((error) => {
      console.error("Transaction failed: ", error);
    });
}

// Function to write post data using an auto-incremented user ID
function writePostData(squirrel_name, description, location, latitude, longitude, image, nut_count) {
  const db = getDatabase(app);
  getNextUserId(db, (userID) => {
    const userRef = ref(db, "users/" + userID);
    console.log("Got new userID:", userID);
    set(userRef, {
      squirrel_name,
      description,
      time: { ".sv": "timestamp" },
      location,
      latitude,
      longitude,
      image,
      nut_count,
    })
      .then(() => {
        console.log("Data written successfully for userID:", userID);
      })
      .catch((error) => {
        console.error("Error writing data:", error);
      });
  });
}


async function getAllUsers() {
  const db = getDatabase(app);
  const usersRef = ref(db, "users");
  try {
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      // Assuming data is an object with user IDs as keys
      // and each value is an object with properties including:
      // image, time, location, squirrel_name, description, and nuts.
      const posts = Object.keys(data).map((key) => {
        const userData = data[key];
        return {
          id: key || "",
          image: userData.image || "",
          time: userData.time ? new Date(userData.time).toLocaleString() : "",
          location: userData.location || "",
          squirrelName: userData.squirrel_name || "",
          description: userData.description || "",
          nuts: userData.nuts || 0,
        };
      });
    //   console.log("All posts:", posts);
      return posts;
    } else {
      console.log("No user data available");
      return [];
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
}

async function getAllUserCoordinates() {
    const db = getDatabase(app);
    const usersRef = ref(db, "users");
  
    try {
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Assume data is an object with user IDs as keys:
        // { userId1: { latitude, longitude, ... }, userId2: { ... } }
        const coordinates = Object.keys(data)
          .map((key) => {
            const { latitude, longitude, squirrel_name } = data[key];
            // Ensure both latitude and longitude exist
            if (latitude !== undefined && longitude !== undefined && squirrel_name !== undefined) {
              return { latitude, longitude, squirrel_name };
            }
            return null;
          })
          .filter((coord) => coord !== null);
  
        console.log("User Coordinates: ", coordinates);
        return coordinates;
      } else {
        console.log("No user data available");
        return [];
      }
    } catch (error) {
      console.error("Error getting user data:", error);
      throw error;
    }
}

async function getUserCount() {
    const db = getDatabase(app);
    const usersRef = ref(db, "users");
    
    try {
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Return the number of keys (users) in the data object
        return Object.keys(data).length;
      } else {
        console.log("No user data available");
        return 0;
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
      throw error;
    }
}

// Ensure Firebase is initialized elsewhere in your project

const uploadImageAsync = async (uri) => {
    try {
      // Convert the local URI to a blob using XMLHttpRequest
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
  
      // Create a unique file name using the URI
      const filename = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = storageRef(storage, `images/${filename}`);
  
      // Upload the blob to Firebase Storage
      const snapshot = await uploadBytes(imageRef, blob);
  
      // Optionally, close the blob
      blob.close && blob.close();
  
      // Get the download URL and return it
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw error;
    }
  };
  

export { app, analytics, writePostData, getAllUsers, getAllUserCoordinates, getUserCount, uploadImageAsync };