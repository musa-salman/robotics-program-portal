import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const getUserRole = async (uid: any): Promise<string> => {
    const querySnapshot = await getDoc(doc(db, "users", uid));
    const userData = querySnapshot.data();
    return userData ? userData.role : "guest";
}

export { getUserRole };