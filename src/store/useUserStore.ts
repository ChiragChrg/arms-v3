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
}

const useUserStore = create<UserProp>((set) => ({
    user: null,
    setUser: (user: UserTypes) => set({ user }),
    deleteUser: () => set({
        user: null
    })
}))

export default useUserStore