"use client"
import { useState, useEffect } from 'react'
import BuildingSVG from '@/assets/BuildingSVG'
import useUserStore from '@/store/useUserStore'
import BookStackSVG from '@/assets/BookStackSVG'
import OpenBookSVG from '@/assets/OpenBookSVG'
import DocumentsSVG from '@/assets/DocumentsSVG'
import CountUp from "react-countup"
import axios from 'axios'

const Dashboard = () => {
    const [count, setCount] = useState<Record<string, number>>({})
    const { user } = useUserStore()

    useEffect(() => {
        const GetCount = async () => {
            try {
                const res = await axios.get('/api/getcount')
                if (res.status === 200) {
                    console.log(res.data.Count)
                    setCount(res?.data?.Count)
                }
            } catch (err) {
                console.log(err)
            }
        }
        // GetCount()
    }, [])

    return (
        <section className='w-full h-full overflow-y-auto'>
            <h1 className='text-[2em] font-medium'>
                Welcome,
                <span className="text-primary"> {user?.username || "Anonymous User"}!</span>
            </h1>

            <div className="grid grid-cols-4 gap-8 mx-8 mt-4">
                <div className="relative rounded-md flex flex-col items-end bg-primary/20 overflow-hidden p-2.5">
                    <div className="absolute top-[-2em] left-[-2em] p-10 rounded-full radialGradient text-white/70 dark:text-white/50">
                        <BuildingSVG size='50' />
                    </div>
                    <CountUp end={count?.institute || 0} duration={2} className='text-[2.5em] font-bold text-primary leading-[1.5em] mr-4 z-[1]' />
                    <p className='w-full text-center text-[1.1em] text-baseClr dark:text-white/80 z-[1]'>Institutes registered</p>
                </div>

                <div className="relative rounded-md flex flex-col items-end bg-primary/20 overflow-hidden p-2.5">
                    <div className="absolute top-[-2em] left-[-2em] p-10 rounded-full radialGradient text-white/70 dark:text-white/50">
                        <BookStackSVG size='50' />
                    </div>
                    <CountUp end={count?.course || 0} duration={2} className='text-[2.5em] font-bold text-primary drop-shadow leading-[1.5em] mr-4 z-[1]' />
                    <p className='w-full text-center text-[1.1em] text-baseClr dark:text-white/80 z-[1]'>Courses created</p>
                </div>

                <div className="relative rounded-md flex flex-col items-end bg-primary/20 overflow-hidden p-2.5">
                    <div className="absolute top-[-2em] left-[-2em] p-10 rounded-full radialGradient text-white/70 dark:text-white/50">
                        <OpenBookSVG size='50' />
                    </div>
                    <CountUp end={count?.subject || 0} duration={2} className='text-[2.5em] font-bold text-primary drop-shadow leading-[1.5em] mr-4 z-[1]' />
                    <p className='w-full text-center text-[1.1em] text-baseClr dark:text-white/80 z-[1]'>Subjects created</p>
                </div>

                <div className="relative rounded-md flex flex-col items-end bg-primary/20 overflow-hidden p-2.5">
                    <div className="absolute top-[-2em] left-[-2em] p-10 rounded-full radialGradient text-white/70 dark:text-white/50">
                        <DocumentsSVG size='50' />
                    </div>
                    <CountUp end={count?.document || 0} duration={2} className='text-[2.5em] font-bold text-primary drop-shadow leading-[1.5em] mr-4 z-[1]' />
                    <p className='w-full text-center text-[1.1em] text-baseClr dark:text-white/80 z-[1]'>PDFs uploaded</p>
                </div>
            </div>
        </section>
    )
}

export default Dashboard