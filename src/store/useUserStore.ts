import { create } from "zustand"

interface UserTypes {
    uid?: string | null,
    username?: string | null,
    email?: string | null,
    avatarImg?: string | null,
    isApproved?: boolean | null,
    accessToken?: string | null,
}

export interface UserProp {
    user: UserTypes | null,
    setUser: (user: UserTypes) => void,
    deleteUser: () => void,
    isAdmin: boolean,
    setIsAdmin: (value: boolean) => void
}

const useUserStore = create<UserProp>((set) => ({
    user: null,
    setUser: (user: UserTypes) => set({ user }),
    deleteUser: () => set({ user: null }),
    isAdmin: false,
    setIsAdmin: (value: boolean) => set({ isAdmin: value })
}))

export default useUserStore