import { memoryLocalCache } from "firebase/firestore";
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
    addToClass: (cid: string) => void;
    removeFromClass: (cid: string) => void;
}

export const useUser = create<userStore>((set) => ({
    user: null,
    setUser: (user) => set({user}),
    addToClass: (cid) => set((state) => {
        if (state.user) {
            if (!state.user.myClasses.includes(cid)) {
                return {
                    user: {
                        ...state.user,
                        myClasses: [...state.user.myClasses, cid],
                    },
                };
            }
        }
        return state;
    }),
    removeFromClass: (cid) => set((state) => {
        if(state.user){
            return {
                user: {
                    ...state.user,
                    myClasses: state.user.myClasses.filter((c) => c !== cid)
                }
            }
        }
        return state
    })
}))