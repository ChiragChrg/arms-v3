"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import useDataStore from '@/store/useDataStore'
import { courseType } from '@/types/dataStoreTypes'
import NavRoute from '@/components/NavRoutes'
import MobileHeader from '@/components/MobileHeader'
import { Button } from '@/components/ui/button'
import { RectLoader } from '@/components/CustomUI/Skeletons'
import BookStackSVG from '@/assets/BookStackSVG'
import OpenBookSVG from '@/assets/OpenBookSVG'
import { PlusIcon, Settings2Icon } from 'lucide-react'

type Params = {
    instituteID: string,
    courseID: string
}

const InstituteInfo = () => {
    const [course, setCourse] = useState<courseType | null | undefined>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [docsCount, setDocsCount] = useState<number>(0)

    const { data } = useDataStore()
    const pathname = usePathname()
    const params = useParams<Params>()
    const router = useRouter()
    const isAdmin = false

    useEffect(() => {
        const fetchInstitute = async () => {
            try {
                const collegeName = params?.instituteID.replaceAll("-", " ")
                const res = await axios.post('/api/getinstitute', { collegeName })

                if (res?.status === 200) {
                    const courseInfo = res?.data?.course?.find((obj: Record<string, string>) => obj?.courseName.toLowerCase().replaceAll(" ", "-") === params?.courseID.toLowerCase())
                    setCourse(courseInfo)
                    setIsLoading(false)
                }
            } catch (error: any) {
                toast.error(error?.response?.data || "Error while fetching Course")
                router.push('/institutions')
                console.log(error)
            }
        }

        if (data !== null) {
            const instituteInfo = data.find(obj => obj.collegeName.toLowerCase().replaceAll(" ", "-") === params?.instituteID.toLowerCase())
            const courseInfo = instituteInfo?.course?.find(obj => obj?.courseName.toLowerCase().replaceAll(" ", "-") === params?.courseID.toLowerCase())
            setCourse(courseInfo)
            setIsLoading(false)
        } else {
            // If no data in store, fetch from DB using DynamicRoute params
            fetchInstitute()
        }
    }, [data, params, router])

    useEffect(() => {
        if (course) {
            let totalDocs = 0

            course?.subjects?.forEach((subjectObj: any) => {
                totalDocs += subjectObj?.subjectDocs?.length
            })

            setDocsCount(totalDocs)
        }
    }, [course])

    return (
        <section className='section_style'>
            <NavRoute routes={["Institutions", `Institutions/${params?.instituteID}`, `.${pathname}`]} />
            <MobileHeader />

            <div className="relative flex items-center gap-4 radialGradient sm:[background:hsl(var(--primary)/0.3)] rounded-md p-2 sm:p-3 mt-4">
                <div className="absolute -top-2 -left-2 sm:top-auto sm:left-auto sm:relative w-fit sm:bg-primary/80 p-6 rounded-full text-white/40 dark:text-white/10 sm:text-white dark:sm:text-white">
                    <BookStackSVG size='80' />
                </div>

                <Button
                    variant='secondary'
                    size='icon'
                    disabled={isLoading}
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-background/80">
                    <Settings2Icon />
                </Button>

                <div className="w-full flex_center flex-col gap-2 px-4 mt-8 sm:mt-0">
                    <div className="flex_center flex-col gap-2 w-full">
                        {!isLoading ?
                            <>
                                <h1 className='text-[1.8em] sm:text-[2em] font-medium drop-shadow'>{course?.courseName}</h1>
                                <p className='opacity-90 text-center'>{course?.courseDesc}</p>
                            </>
                            :
                            <>
                                <RectLoader height='45px' className='mt-3 sm:mt-0 max-w-[600px]' />
                                <RectLoader />
                            </>
                        }
                    </div>

                    <span className="w-full h-[2px] bg-slate-400/40"></span>

                    <div className="w-full flex justify-between sm:justify-center items-center gap-2 sm:gap-10 text-[0.9em]">
                        {!isLoading ?
                            <>
                                <span>Subjects: {course?.subjects?.length || 0}</span>
                                <span>Documents: {docsCount}</span>
                            </>
                            :
                            <>
                                <RectLoader />
                                <RectLoader />
                                <RectLoader />
                            </>
                        }
                    </div>

                    <div className="w-full flex justify-end items-center text-[0.8em] opacity-70">
                        {!isLoading ?
                            <span>Registered by: {course?.courseCreator}</span>
                            :
                            <RectLoader />
                        }
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center py-4">
                <h2 className='text-[1.7em] font-medium'>Subjects</h2>
                {!isAdmin &&
                    <Button className='flex_center gap-2 text-[1em] text-white rounded-sm px-3'>
                        <PlusIcon />
                        <span>Create</span>
                        <span className='hidden sm:block'>Subject</span>
                    </Button>
                }
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1.25em]">
                {course?.subjects?.map((obj, index) => (
                    <Link
                        href={`${pathname}/${obj?.subjectName?.toLowerCase().replaceAll(" ", "-")}`}
                        key={index}
                        className="flex_center flex-col w-full h-full rounded-md radialGradient px-2 py-4 sm:hover:translate-y-[-0.3em] transition-transform duration-200">
                        <div className="w-fit bg-primary/80 p-4 rounded-full mb-4 text-white">
                            <OpenBookSVG size='40' />
                        </div>
                        <span className="text-[1.4em] font-medium">{obj?.subjectName}</span>
                        <p className="w-full max-h-[45px] text-center text-[0.925em] opacity-80">{obj?.subjectDesc}</p>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default InstituteInfo