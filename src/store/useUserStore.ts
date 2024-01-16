import { create } from "zustand"

export interface UserTypes {
    uid: string,
    username: string,
    email: string,
    avatarImg: string,
    isApproved: boolean,
    accessToken: string,
}

export interface UserProp {
    user: UserTypes | null,
    setUser: (user: UserTypes) => void,
    deleteUser: () => void,
    isAdmin: boolean,
    setIsAdmin: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void
}

const useUserStore = create<UserProp>((set) => ({
    user: null,
    setUser: (user: UserTypes) => set({ user }),
    deleteUser: () => set({ user: null }),
    isAdmin: false,
    setIsAdmin: (value: boolean) => set({ isAdmin: value }),
    isLoading: true,
    setIsLoading: (value: boolean) => set({ isLoading: value }),
}))

export default useUserStore