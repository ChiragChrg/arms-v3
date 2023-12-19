"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import CountUp from "react-countup"
import useUserStore from '@/store/useUserStore'
import MobileHeader from '@/components/MobileHeader'
import BuildingSVG from '@/assets/BuildingSVG'
import BookStackSVG from '@/assets/BookStackSVG'
import OpenBookSVG from '@/assets/OpenBookSVG'
import DocumentsSVG from '@/assets/DocumentsSVG'
import { AlertCircle } from "lucide-react"

interface CountDataType {
    institute: number,
    course: number,
    subject: number,
    document: number,
}

type RecentDataType = {
    url: string,
    title: string,
    subtitle: string
}

const Dashboard = () => {
    const [recentTopic, setRecentTopic] = useState<RecentDataType[]>([])
    const { user } = useUserStore()

    const { data: count } = useQuery({
        queryKey: ["dashCount"],
        queryFn: async () => {
            const { data } = await axios.get('/api/get/dashcount')
            return data as CountDataType
        }
    })

    useEffect(() => {
        const recentsData = JSON.parse(localStorage.getItem("arms-recents") as string)
        setRecentTopic(recentsData)
    }, [])

    return (
        <section className='section_style'>
            <MobileHeader />

            <h1 className='text-[1.6em] text-center sm:text-[2em] font-medium'>
                Welcome,
                <span className="text-primary"> {user?.username?.split(" ")[0]}!</span>
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-8 sm:mx-8 2xl:mx-[10em] mt-4 2xl:mt-8">
                <div className="relative rounded-md flex flex-col items-end overflow-hidden p-2.5 bg-radialGradient dark:bg-radialGradientDark">
                    <div className="flex justify-between items-start w-full">
                        <BuildingSVG size='50' className='text-white dark:text-white/80' />
                        <CountUp end={count?.institute || 0} duration={4} className='text-[2.5em] font-bold text-primary leading-[1.5em] mr-4 z-[1]' />
                    </div>
                    <p className='w-full text-center text-[0.9em] sm:text-[1.1em] text-baseClr dark:text-white/80 z-[1]'>Institutes registered</p>
                </div>

                <div className="relative rounded-md flex flex-col items-end overflow-hidden p-2.5 bg-radialGradient dark:bg-radialGradientDark">
                    <div className="flex justify-between items-start w-full">
                        <BookStackSVG size='50' className='text-white dark:text-white/80' />
                        <CountUp end={count?.course || 0} duration={4} className='text-[2.5em] font-bold text-primary drop-shadow leading-[1.5em] mr-4 z-[1]' />
                    </div>
                    <p className='w-full text-center text-[0.9em] sm:text-[1.1em] text-baseClr dark:text-white/80 z-[1]'>Courses created</p>
                </div>

                <div className="relative rounded-md flex flex-col items-end overflow-hidden p-2.5 bg-radialGradient dark:bg-radialGradientDark">
                    <div className="flex justify-between items-start w-full">
                        <OpenBookSVG size='50' className='text-white dark:text-white/80' />
                        <CountUp end={count?.subject || 0} duration={4} className='text-[2.5em] font-bold text-primary drop-shadow leading-[1.5em] mr-4 z-[1]' />
                    </div>
                    <p className='w-full text-center text-[0.9em] sm:text-[1.1em] text-baseClr dark:text-white/80 z-[1]'>Subjects created</p>
                </div>

                <div className="relative rounded-md flex flex-col items-end overflow-hidden p-2.5 bg-radialGradient dark:bg-radialGradientDark">
                    <div className="flex justify-between items-start w-full">
                        <DocumentsSVG size='50' className='text-white dark:text-white/80' />
                        <CountUp end={count?.document || 0} duration={4} className='text-[2.5em] font-bold text-primary drop-shadow leading-[1.5em] mr-4 z-[1]' />
                    </div>
                    <p className='w-full text-center text-[0.9em] sm:text-[1.1em] text-baseClr dark:text-white/80 z-[1]'>PDFs uploaded</p>
                </div>
            </div>

            {(user?.avatarImg && !user.isApproved) &&
                <div className="bg-alertGradient border border-yellow-400/40 w-fit mx-auto my-2 mt-8 px-4 py-2 text-center rounded-md">
                    <div className="flex_center gap-2 mb-2">
                        <AlertCircle size={20} />
                        User Approval Pending!
                    </div>
                    <p className="text-[0.9em]">You will gain CREATE / UPLOAD Access after approval by admin.</p>
                    <p className="text-[0.9em]">An email will be sent to <span className="text-blue-600">{user.email}</span> after approval</p>
                </div>
            }

            <h2 className='text-[1.3em] sm:text-[1.6em] font-medium mt-6 mb-2'>
                Recent
                <span className="text-primary"> Topics</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {recentTopic?.map((data, index) => (
                    <Link href={data?.url} key={index} className="bg-primary/60 p-2 px-4 flex justify-start gap-6 rounded-md text-white">
                        <OpenBookSVG size='50' />
                        <div className="flex flex-col">
                            <span className="text-[0.8em] opacity-70 capitalize">{data?.subtitle}</span>
                            <h3 className="text-[1.2em] font-bold uppercase">{data?.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default Dashboard
