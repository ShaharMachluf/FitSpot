import { collection, getDoc, getDocs, doc, addDoc, setDoc, deleteDoc, updateDoc, arrayUnion, arrayRemove, FieldValue } from "firebase/firestore";
import { database } from "./firebase-config";
import { Class } from "../stores/useClassStore";


const classRef = collection(database, 'classes')

export const fetchClass = async (id: string): Promise<Class | Error> => {
    try {
        const docRef = doc(database, 'classes', id);
        const docSnap = await getDoc(docRef);
        return docSnap.data() as Class;
    } catch(error){
        return error as Error;
    }
}

export const fetchAllClasses = async(): Promise<Class[] | Error> => {
    try{
        const docsSnap = await getDocs(classRef)
        const classList = docsSnap.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            } as Class
        })
        return classList
    }catch(error){
        return error as Error
    }
}

export const addClass = async(c: Omit<Class, "id">): Promise<string> => {
    try{
        const docRef = await addDoc(classRef, c)
        return docRef.id
    }catch(error){
        const er = error as Error
        return er.message
    }
}

export const updateClass = async(c: Class): Promise<Class | string> => {
    try{
        await setDoc(doc(database, 'classes', c.id), c)
        return c
    }catch (error){
        const er = error as Error
        return er.message
    }
}

export const removeClass = async(id: string): Promise<string> => {
    try {
        await deleteDoc(doc(database, 'classes', id))
        return id
    } catch (error) {
        const er = error as Error
        return er.message
    }
}

export const addUserToClass = async(uid: string, cid: string, arr: string): Promise<string> => {
    try{
        const classRef = doc(database, 'classes', cid)
        if(arr === 'register'){
            await updateDoc(classRef, {
                participants: arrayUnion(uid)
            })
        } else{
            await updateDoc(classRef, {
                waitingList: arrayUnion(uid)
            })
        }

        return cid;
    }catch (error){
        const er = error as Error
        return er.message
    }
}

export const removeUserFromClass = async(uid: string, cid: string, arr: string): Promise<string> => {
    try{
        const classRef = doc(database, 'classes', cid)
        if(arr === 'register'){
            await updateDoc(classRef, {
                participants: arrayRemove(uid)
            })
        } else{
            await updateDoc(classRef, {
                waitingList: arrayRemove(uid)
            })
        }
        return cid;
    }catch (error){
        const er = error as Error
        return er.message
    }
}