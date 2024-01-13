"use client"
import Modal from './Modal'
import { signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import useModalStore from '@/store/useModalStore'
import useUserStore from '@/store/useUserStore'
import useSidebarStore from '@/store/useSidebarStore'
import useLoaderStore from '@/store/useLoaderStore'
import { Button } from '@/components/ui/button'
import { LogOutIcon, X } from 'lucide-react'

const LogoutModal = () => {
    const { isOpen, onClose } = useModalStore()
    const { deleteUser } = useUserStore()
    const { setShowSidebar } = useSidebarStore()
    const { setShowLoader } = useLoaderStore()
    const router = useRouter()

    const HandleLogout = async () => {
        setShowLoader(true)

        try {
            signOut({
                callbackUrl: "/",
                redirect: false
            })
            deleteUser()
            onClose()
            setShowSidebar(false)

            localStorage.removeItem("arms-anonymous-user")
            router.push("/")
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    return (
        <Modal
            title='Confirm Logout'
            description='Confirm to Logout of ARMS?'
            isOpen={isOpen === "LogoutModal"}
            onClose={onClose}
        >
            <div className="flex justify-between items-end gap-8 w-[20em] h-[5em]">
                <Button variant="secondary" onClick={() => onClose()} className='flex_center gap-2 w-full'>
                    <X size={20} />
                    <span>Cancel</span>
                </Button>

                <Button variant="destructive" onClick={HandleLogout} className='flex_center gap-2 w-full text-white'>
                    <LogOutIcon size={20} />
                    <span>Logout</span>
                </Button>
            </div>
        </Modal>
    )
}

export default LogoutModal