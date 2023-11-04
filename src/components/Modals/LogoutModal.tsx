"use client"
import React, { useState } from 'react'
import Modal from './Modal'
import { useRouter } from 'next/navigation'
import useModalStore from '@/store/useModalStore'
import useUserStore from '@/store/useUserStore'
import { Button } from '@/components/ui/button'
import { Loader, LogOutIcon, X } from 'lucide-react'
import { signOut } from "next-auth/react"
import useSidebarStore from '@/store/useSidebarStore'

const LogoutModal = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { isOpen, onClose } = useModalStore()
    const { deleteUser } = useUserStore()
    const router = useRouter()
    const { setShowSidebar } = useSidebarStore()

    const HandleLogout = async () => {
        setIsLoading(true)
        try {
            signOut({
                callbackUrl: "/"
            })
            deleteUser()
            onClose()
            setShowSidebar(false)

            localStorage.removeItem("arms-user")
            router.push("/")
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoading(false)
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
                    {isLoading ?
                        <Loader size={20} className='animate-spin' />
                        :
                        <LogOutIcon size={20} />}
                    <span>Logout</span>
                </Button>
            </div>
        </Modal>
    )
}

export default LogoutModal