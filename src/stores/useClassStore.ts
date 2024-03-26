import { create } from "zustand";

export interface Class{
    id: string;
    name: string;
    trainer: string;
    date: string;
    start: string;
    end: string;
    minParticipants: number;
    maxParticipants: number;
    participants: string[];
    waitingList: string[];
}

interface classStore{
    classes: Class[];
    setClasses: (cs: Class[]) => void;
    addClass: (c: Class) => void;
    updateClass: (updatedClass: Class) => void;
    removeClass: (id: string) => void;
    addUserToClass: (uid: string, cid: string) => void;
    addUserToWaiting: (uid: string, cid: string) => void;
    removeUserFromClass: (uid: string, cid: string) => void;
    removeUserFromWaiting: (uid: string, cid: string) => void;
}

export const useClass = create<classStore>((set) => ({
    classes: [],
    setClasses: (classes) => set({classes}),
    addClass: (c) => set((state)=> ({classes:[...state.classes, c]})),
    updateClass: (updatedClass) => set((state) => ({classes: state.classes.map((c) => c.id === updatedClass.id ? updatedClass : c)})),
    removeClass: (id) => set((state)=> ({classes: state.classes.filter((c) => c.id !== id)})), 
    addUserToClass: (uid, cid) => set((state) => ({
        classes: state.classes.map((c) =>
            c.id === cid
                ? {
                      ...c,
                      participants: [...c.participants, uid],
                  }
                : c
        ),
    })),
    addUserToWaiting: (uid, cid) => set((state) => ({
        classes: state.classes.map((c) => 
            c.id === cid ? {
                ...c, 
                waitingList: [...c.waitingList, uid],
            }
            : c
        )
    })),
    removeUserFromClass: (uid, cid) => set((state) => ({
        classes: state.classes.map((c) => 
            c.id === cid ? {...c, participants: c.participants.filter(userId => userId !== uid)} : c
        )
    })),
    removeUserFromWaiting: (uid, cid) => set((state) => ({
        classes: state.classes.map((c) => 
            c.id === cid ? {...c, waitingList: c.waitingList.filter(userId => userId !== uid)} : c
        )
    }))
}))