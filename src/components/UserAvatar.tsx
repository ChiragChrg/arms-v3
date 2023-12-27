"use client"
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import useUserStore from '@/store/useUserStore'
import useModalStore from '@/store/useModalStore'
import { RectLoader } from "./CustomUI/Skeletons"
import { Button } from './ui/button'
import { LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useLoaderStore from '@/store/useLoaderStore'
import AvatarImage from './CustomUI/AvatarImage'

const UserAvatar = () => {
    const { user, setUser, setIsAdmin } = useUserStore()
    const { onOpen } = useModalStore()
    const { setShowLoader } = useLoaderStore()
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        // console.log(session, status)
        if (status == "authenticated" && session !== null) {
            const formattedUser = {
                uid: session?.user?.uid!,
                username: session?.user?.name,
                email: session?.user?.email,
                avatarImg: session?.user?.avatarImg,
                isApproved: session?.user?.isApproved,
                accessToken: session?.user?.accessToken,
            }
            setUser(formattedUser)
            setIsAdmin(session?.user?.uid === process.env.NEXT_PUBLIC_ARMS_ADMIN_UID)
            localStorage.setItem("arms-user", JSON.stringify(formattedUser));
        }
    }, [session, status, setUser, setIsAdmin])

    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem('arms-user') as string)

        if (!localUser?.uid && status === "unauthenticated") {
            router.push('/')
        } else {
            setUser(localUser)

            setTimeout(() => {
                setShowLoader(false)
            }, 2500)
        }
    }, [router, status, setUser, setShowLoader])

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
                disabled={status == "loading"}>
                <LogOutIcon size={20} />
            </Button>
        </div>
    )
}

export default UserAvatar