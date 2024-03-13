import { collection, getDoc, getDocs, doc, addDoc, setDoc, deleteDoc } from "firebase/firestore";
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
            return doc.data() as Class
        })
        return classList
    }catch(error){
        return error as Error
    }
}

export const addClass = async(c: Class): Promise<string> => {
    try{
        const docRef = await addDoc(classRef, c)
        return docRef.id
    }catch(error){
        const er = error as Error
        return er.message
    }
}

export const updateClass = async(c: Class): Promise<string> => {
    try{
        await setDoc(doc(database, 'classes', c.id), c)
        return c.id
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