"use client"
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import CountUp from "react-countup"
import { User2 } from 'lucide-react'
import { CircleLoader } from '@/components/CustomUI/Skeletons'
import useUserStore from '@/store/useUserStore'
import useSidebarStore from '@/store/useSidebarStore'
import BuildingSVG from '@/assets/BuildingSVG'
import BookStackSVG from '@/assets/BookStackSVG'
import OpenBookSVG from '@/assets/OpenBookSVG'
import DocumentsSVG from '@/assets/DocumentsSVG'
import HamMenuSVG from '@/assets/HamMenuSVG'

const Dashboard = () => {
    const [count, setCount] = useState<Record<string, number>>({})
    const { user } = useUserStore()
    const { setShowSidebar } = useSidebarStore()
    const { status } = useSession()

    useEffect(() => {
        const GetCount = async () => {
            try {
                const res = await fetch('/api/dashcount', {
                    cache: "force-cache"
                })

                if (res.status === 200) {
                    const data = await res.json();
                    console.log(data)
                    setCount(data)
                }
            } catch (err) {
                console.log(err)
            }
        }
        GetCount()
    }, [])

    return (
        <section className='w-full h-full overflow-y-auto'>
            <div className="flex sm:hidden justify-between items-center px-2 mb-4">
                <div onClick={() => setShowSidebar(true)} >
                    <HamMenuSVG size="40" className='sm:hidden text-logoClr dark:text-white' />
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

            <h1 className='text-[1.6em] text-center sm:text-[2em] font-medium'>
                Welcome back,
                <span className="text-primary"> {user?.username?.split(" ")[0]}!</span>
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-8 mx-2 sm:mx-8 2xl:mx-[10em] mt-4 2xl:mt-8">
                <div className="relative rounded-md flex flex-col items-end overflow-hidden p-2.5 radialGradient">
                    <div className="flex justify-between items-start w-full">
                        <BuildingSVG size='50' className='text-white dark:text-white/80' />
                        <CountUp end={count?.institute || 0} duration={4} className='text-[2.5em] font-bold text-primary leading-[1.5em] mr-4 z-[1]' />
                    </div>
                    <p className='w-full text-center text-[0.9em] sm:text-[1.1em] text-baseClr dark:text-white/80 z-[1]'>Institutes registered</p>
                </div>

                <div className="relative rounded-md flex flex-col items-end overflow-hidden p-2.5 radialGradient">
                    <div className="flex justify-between items-start w-full">
                        <BookStackSVG size='50' className='text-white dark:text-white/80' />
                        <CountUp end={count?.course || 0} duration={4} className='text-[2.5em] font-bold text-primary drop-shadow leading-[1.5em] mr-4 z-[1]' />
                    </div>
                    <p className='w-full text-center text-[0.9em] sm:text-[1.1em] text-baseClr dark:text-white/80 z-[1]'>Courses created</p>
                </div>

                <div className="relative rounded-md flex flex-col items-end overflow-hidden p-2.5 radialGradient">
                    <div className="flex justify-between items-start w-full">
                        <OpenBookSVG size='50' className='text-white dark:text-white/80' />
                        <CountUp end={count?.subject || 0} duration={4} className='text-[2.5em] font-bold text-primary drop-shadow leading-[1.5em] mr-4 z-[1]' />
                    </div>
                    <p className='w-full text-center text-[0.9em] sm:text-[1.1em] text-baseClr dark:text-white/80 z-[1]'>Subjects created</p>
                </div>

                <div className="relative rounded-md flex flex-col items-end overflow-hidden p-2.5 radialGradient">
                    <div className="flex justify-between items-start w-full">
                        <DocumentsSVG size='50' className='text-white dark:text-white/80' />
                        <CountUp end={count?.document || 0} duration={4} className='text-[2.5em] font-bold text-primary drop-shadow leading-[1.5em] mr-4 z-[1]' />
                    </div>
                    <p className='w-full text-center text-[0.9em] sm:text-[1.1em] text-baseClr dark:text-white/80 z-[1]'>PDFs uploaded</p>
                </div>
            </div>
        </section>
    )
}

export default Dashboard