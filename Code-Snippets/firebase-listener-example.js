import { ref, onValue } from "firebase/database";
import { db } from "./firebaseConfig";

const babyRef = ref(db, "baby");

onValue(babyRef, (snapshot) => {
  const data = snapshot.val();

  console.log("Cry Status:", data.isCrying);
  console.log("Wet Status:", data.isWet);
});