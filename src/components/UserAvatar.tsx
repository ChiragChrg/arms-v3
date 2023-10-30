"use client"
import Image from 'next/image'
import { Button } from './ui/button'
import { LogOutIcon, User2 } from 'lucide-react'
import { useState } from 'react'
import { CircleLoader, RectLoader } from "./CustomUI/Skeletons"
import useUserStore from '@/store/useUserStore'
import useModalStore from '@/store/useModalStore'

const UserAvatar = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { user } = useUserStore()
    const { onOpen } = useModalStore()

    return (
        <div className="flex justify-between items-center gap-2 w-full p-1 rounded text-white bg-black/40">
            <div className="flex_center w-fit aspect-square rounded-full overflow-hidden">
                <CircleLoader size='40px' className={isLoading ? 'block' : "hidden"} />
                {user?.avatarImg ?
                    <Image
                        src={user?.avatarImg}
                        alt='User_Avatar'
                        width={40}
                        height={40}
                        loading='eager'
                        onLoadingComplete={() => setIsLoading(false)}
                        className={isLoading ? 'hidden' : "block object-cover"}
                    />
                    :
                    <div className="bg-slate-500 w-fit p-1.5">
                        <User2 size={30} />
                    </div>
                }
            </div>

            <div className="flex_center flex-col w-full max-w-[9.5em]">
                {isLoading ?
                    <>
                        <RectLoader height='22px' className='mb-1' />
                        <RectLoader height='14px' />
                    </>
                    :
                    <>
                        <h2 className="text-[0.95em]">{user?.username || "Anonymous"}</h2>
                        <span className='opacity-80 text-[0.6em] tracking-wider'>{user?.email || "Student"}</span>
                    </>
                }
            </div>

            <Button
                variant="destructive"
                size="icon"
                className='bg-red-800 hover:bg-red-700'
                onClick={() => onOpen("LogoutModal")}
                disabled={isLoading}>
                <LogOutIcon size={20} />
            </Button>
        </div>
    )
}

export default UserAvatar