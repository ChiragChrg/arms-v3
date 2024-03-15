"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import OpenBookSVG from '@/assets/Icons/OpenBookSVG'
import useUserStore from '@/store/useUserStore'

type RecentTopicsType = {
    [key: string]: RecentDataType[]
}

type RecentDataType = {
    url: string,
    title: string,
    subtitle: string
}

const RecentSubjects = () => {
    const [recentTopic, setRecentTopic] = useState<RecentDataType[]>([])
    const { user } = useUserStore()

    useEffect(() => {
        const userID = user?.uid as string
        const recentDataUsers: RecentTopicsType = JSON.parse(localStorage.getItem("arms-recents") as string) || []
        const userRecents = recentDataUsers[userID]
        setRecentTopic(userRecents)
    }, [user])

    if (recentTopic)
        return (
            <div>
                <h2 className='text-[1.3em] sm:text-[1.6em] font-medium mt-6 mb-2'>
                    Recent
                    <span className="text-primary"> Topics</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
            </div>
        )
}

export default RecentSubjects