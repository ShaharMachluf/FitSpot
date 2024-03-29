import { FieldValue, arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
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

export const updateUser = async(user: User): Promise<User | string> => {
    const q = query(userRef, where('uid', "==", user.uid));
    try {
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const docRef = userDoc.ref;
            await setDoc(docRef, user); 
            
        };
        return user;
    } catch (error) {
        const er = error as Error
        return er.message
    }
}

export const addClasstoUser = async(uid: string, cid: string): Promise<string> => {
    try {
        const q = query(collection(database, 'accounts'), where('uid', '==', uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];

            await updateDoc(userDoc.ref, {
                myClasses: arrayUnion(cid)
            });

            return uid;
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        const er = error as Error;
        return er.message;
    }
}

export const removeClassFromUser = async(uid: string, cid: string): Promise<string> => {
    try {
        const q = query(collection(database, 'accounts'), where('uid', '==', uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];

            await updateDoc(userDoc.ref, {
                myClasses: arrayRemove(cid)
            });

            return uid;
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        const er = error as Error;
        return er.message;
    }
}