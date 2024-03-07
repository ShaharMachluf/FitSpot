import { create } from "zustand";

export interface User{
    email: string;
    firstName: string;
    lastName: string;
    mobile: string;
    isTrainer: boolean;
    myClasses: string[];
    uid: string;
}

interface userStore{
    user: User | null;
    setUser: (user: User) => void;
}

export const useUser = create<userStore>((set) => ({
    user: null,
    setUser: (user) => set({user})
}))