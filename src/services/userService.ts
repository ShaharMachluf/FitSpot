import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, database } from "./firebase-config";
import { User } from "../stores/useUserStore";


const userRef = collection(database, 'accounts')

export const fetchUser = async(): Promise<User> => {
    const q = query(userRef, where('uid', "==", auth.currentUser?.uid));
    const querySnapshot = await getDocs(q);
    const userList = querySnapshot.docs.map((doc) => {
        const data = doc.data() as User;
        return data
    })
    return userList[0]
}