"use client"
import Image from "next/image"
import { useSession } from 'next-auth/react'
import useSidebarStore from '@/store/useSidebarStore'
import useUserStore from '@/store/useUserStore'
import HamMenuSVG from '@/assets/HamMenuSVG'
import { CircleLoader } from './CustomUI/Skeletons'
import { User2 } from 'lucide-react'

const MobileHeader = () => {
    const { user } = useUserStore()
    const { setShowSidebar } = useSidebarStore()
    const { status } = useSession()

    return (
        <div className="flex lg:hidden justify-between items-center mb-4">
            <div onClick={() => setShowSidebar(true)} >
                <HamMenuSVG size="40" className='lg:hidden text-logoClr dark:text-white' />
            </div>

            <div className="flex_center w-fit aspect-square rounded-full overflow-hidden">
                <CircleLoader size='40px' className={status == "loading" ? 'block' : "hidden"} />
                {user?.avatarImg ?
                    <Image
                        src={user?.avatarImg}
                        alt='User_Avatar'
                        width={40}
                        height={40}
                        loading='eager'
                        className={status == "loading" ? 'hidden' : "block object-cover"}
                    />
                    :
                    <div className={status == "loading" ? 'hidden' : "block bg-slate-400 text-white w-fit p-1.5"}>
                        <User2 size={30} />
                    </div>
                }
            </div>
        </div>
    )
}

export default MobileHeader