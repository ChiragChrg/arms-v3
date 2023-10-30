import { create } from "zustand"

export interface ModalProps {
    isOpen: string | null,
    onOpen: (id: string) => void,
    onClose: () => void,
}

const useModalStore = create<ModalProps>((set) => ({
    isOpen: null,
    onOpen: (id: string) => set({ isOpen: id }),
    onClose: () => set({ isOpen: null }),
}))

export default useModalStore