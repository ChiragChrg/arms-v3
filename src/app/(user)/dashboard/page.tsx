"use client"
import CountUp from "react-countup"
import useUserStore from '@/store/useUserStore'
import BuildingSVG from '@/assets/BuildingSVG'
import BookStackSVG from '@/assets/BookStackSVG'
import OpenBookSVG from '@/assets/OpenBookSVG'
import DocumentsSVG from '@/assets/DocumentsSVG'
import MobileHeader from '@/components/MobileHeader'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface CountDataType {
    institute: number,
    course: number,
    subject: number,
    document: number,
}

const Dashboard = () => {
    const { user } = useUserStore()

    const { data: count } = useQuery({
        queryKey: ["dashCount"],
        queryFn: async () => {
            const { data } = await axios.get('/api/dashcount')
            return data as CountDataType
        }
    })

    return (
        <section className='section_style'>
            <MobileHeader />

            <h1 className='text-[1.6em] text-center sm:text-[2em] font-medium'>
                Welcome back,
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
        </section>
    )
}

export default Dashboard