import { create } from "zustand";

interface SidebarState {
    showSidebar: boolean,
    setShowSidebar: (state: boolean) => void
}

const useSidebarStore = create<SidebarState>((set) => ({
    showSidebar: true,
    setShowSidebar: (state: boolean) => set({ showSidebar: state })
}))

export default useSidebarStore