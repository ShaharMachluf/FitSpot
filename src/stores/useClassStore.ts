import { create } from "zustand";

export interface Class{
    id: string;
    name: string;
    trainer: string;
    date: Date;
    start: string;
    end: string;
    minParticipants: number;
    maxParticipants: number;
    participants: string[];
    waitingList: string[];
}

interface classStore{
    classes: Class[];
    addClass: (c: Class) => void;
    updateClass: (updatedClass: Class) => void;
    removeClass: (id: string) => void;
}

export const useUser = create<classStore>((set) => ({
    classes: [],
    addClass: (c) => set((state)=> ({classes:[...state.classes, c]})),
    updateClass: (updatedClass) => set((state) => ({classes: state.classes.map((c) => c.id === updatedClass.id ? updatedClass : c)})),
    removeClass: (id) => set((state)=> ({classes: state.classes.filter((c) => c.id !== id)})) 
}))