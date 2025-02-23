import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, runTransaction, get } from "firebase/database";

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

// Only initialize analytics if in a browser environment
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
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
function writePostData(squirrel_name, description, location, image, nut_count) {
  const db = getDatabase(app);
  getNextUserId(db, (userID) => {
    const userRef = ref(db, "users/" + userID);
    console.log("Got new userID:", userID);
    set(userRef, {
      squirrel_name,
      description,
      time: { ".sv": "timestamp" },
      location,
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

// Example usage:
writePostData("Nutty", "He stole my lunch", "2/22", "Tisch Library", "DEMO_URL");

// Function to get all user data
async function getAllUsers() {
    const db = getDatabase(app);
    const usersRef = ref(db, "users");
    try {
        const snapshot = await get(usersRef);
        if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("All user data:", data);
        return data;
        } else {
        console.log("No user data available");
        return null;
        }
    } catch (error) {
        console.error("Error getting user data:", error);
        throw error;
    }
}
  
// Example usage for reading data:
getAllUsers();

export { app, analytics, writePostData, getAllUsers };