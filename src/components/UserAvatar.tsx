"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import useUserStore from '@/store/useUserStore'
import useModalStore from '@/store/useModalStore'
import useLoaderStore from '@/store/useLoaderStore'

import { Button } from './ui/button'
import { RectLoader } from "./CustomUI/Skeletons"
import AvatarImage from './CustomUI/AvatarImage'
import { LogOutIcon } from 'lucide-react'

const UserAvatar = () => {
    const { user, setUser, setIsAdmin, setIsLoading } = useUserStore()
    const { onOpen } = useModalStore()
    const { setShowLoader } = useLoaderStore()
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        // console.log(session, status)
        const isAnonymousUser = JSON.parse(localStorage.getItem('arms-anonymous-user') as string)

        if (isAnonymousUser) {
            // Set a dummy Anonymous user info
            const formattedUser = {
                uid: "anonymous",
                username: "Student",
                email: "Anomymous User",
                avatarImg: "",
                isApproved: false,
                accessToken: "",
            }
            setUser(formattedUser)
            setIsLoading(false)

            setTimeout(() => {
                setShowLoader(false)
            }, 2500)
        } else if (status == "authenticated" && session !== null) {
            const formattedUser = {
                uid: session?.user?.uid!,
                username: session?.user?.name as string,
                email: session?.user?.email as string,
                avatarImg: session?.user?.avatarImg ?? '',
                isApproved: session?.user?.isApproved ?? false,
                accessToken: session?.user?.accessToken ?? '',
            }
            setUser(formattedUser)
            setIsAdmin(session?.user?.uid === process.env.NEXT_PUBLIC_ARMS_ADMIN_UID)
            setIsLoading(false)

            setTimeout(() => {
                setShowLoader(false)
            }, 2500)
        } else if (status === "unauthenticated") {
            router.push('/')
        }
    }, [session, status, router, setUser, setIsAdmin, setShowLoader, setIsLoading])

    return (
        <div className="flex justify-between items-center gap-2 w-full p-1 rounded text-white bg-primary/50 dark:bg-sidebarLinkClr drop-shadow-md">
            <AvatarImage url={user?.avatarImg} />

            <div className="flex_center flex-col w-full max-w-[9.5em]">
                {status == "loading" ?
                    <>
                        <RectLoader height='22px' className='mb-1' />
                        <RectLoader height='14px' />
                    </>
                    :
                    <>
                        <h2 className="text-[0.95em]">{user?.username}</h2>
                        <span className='opacity-80 text-[0.6em] tracking-wider'>{user?.email}</span>
                    </>
                }
            </div>

            <Button
                variant="destructive"
                size="icon"
                onClick={() => onOpen("LogoutModal")}
                className='deleteBtnBg'
                name='Logout'
                title='Logout'
                disabled={status == "loading"}>
                <LogOutIcon size={20} />
            </Button>
        </div>
    )
}


export default UserAvatar