import { DocumentData } from "@google-cloud/firestore";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { dbService } from "./firebase";

export const getDBdata = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(dbService, collectionName));
  const dbData: DocumentData[] = await querySnapshot.docs.map((doc) =>
    doc.data()
  );
  return dbData;
};

export const postDBdata = async (user: string, countCorrect: number) => {
  try {
    const docRef = await addDoc(collection(dbService, "users"), {
      user,
      score: countCorrect,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
