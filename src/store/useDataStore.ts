import { create } from "zustand"
import { DataStoreTypes } from "@/types/dataStoreTypes"

export interface UserProp {
    data: DataStoreTypes[] | null,
    setData: (data: DataStoreTypes[]) => void,
}

const useDataStore = create<UserProp>((set) => ({
    data: null,
    setData: (data: DataStoreTypes[]) => set({ data }),
}))

export default useDataStore