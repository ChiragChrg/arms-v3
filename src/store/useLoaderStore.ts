import { create } from "zustand";

interface LoaderTypes {
    showLoader: boolean,
    setShowLoader: (state: boolean) => void
}

const useLoaderStore = create<LoaderTypes>((set) => ({
    showLoader: true,
    setShowLoader: (state: boolean) => set({ showLoader: state })
}))

export default useLoaderStore