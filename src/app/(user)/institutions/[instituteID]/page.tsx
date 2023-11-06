"use client"
import BuildingSVG from '@/assets/BuildingSVG'
import { RectLoader } from '@/components/CustomUI/Skeletons'
import MobileHeader from '@/components/MobileHeader'
import NavRoute from '@/components/NavRoutes'
import { Button } from '@/components/ui/button'
import useDataStore from '@/store/useDataStore'
import { DataStoreTypes } from '@/types/dataStoreTypes'
import axios from 'axios'
import { Settings2Icon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
    params: {
        instituteID: string
    }
}

const InstituteInfo = ({ params }: Props) => {
    const [institute, setInstitute] = useState<DataStoreTypes | null | undefined>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [subjectCount, setSubjectCount] = useState<number>(0)
    const [docsCount, setDocsCount] = useState<number>(0)

    const { data } = useDataStore()
    const pathname = usePathname()
    const router = useRouter()
    const isAdmin = false

    useEffect(() => {
        const fetchInstitute = async () => {
            try {
                const collegeName = params?.instituteID.replaceAll("-", " ")
                const res = await axios.post('/api/getinstitute', { collegeName })
                console.log(res)
                if (res?.status === 200) {
                    setInstitute(res?.data)
                    setIsLoading(false)
                }
            } catch (error: any) {
                toast.error(error?.response?.data || "Error while fetching Institute")
                router.push('/institutions')
                console.log(error)
            }
        }

        if (data !== null) {
            const instituteInfo = data.find(obj => obj.collegeName.toLowerCase().replaceAll(" ", "-") === params?.instituteID)
            setInstitute(instituteInfo)
            setIsLoading(false)
        } else {
            // If no data in store, fetch from DB using DynamicRoute params
            fetchInstitute()
        }
    }, [data, params, router])

    useEffect(() => {
        if (institute) {
            console.log(institute)
            let totalSubject = 0
            let totalDocs = 0

            institute?.course?.forEach((courseObj: any) => {
                totalSubject += courseObj?.subjects?.length

                courseObj?.subjects?.forEach((subjectObj: any) => {
                    totalDocs += subjectObj?.subjectDocs?.length
                })
            })

            setSubjectCount(totalSubject)
            setDocsCount(totalDocs)
        }
    }, [institute])

    return (
        <section className='section_style'>
            <NavRoute routes={["Institutions", `.${pathname}`]} />
            <MobileHeader />

            <div className="relative flex items-center gap-4 radialGradient sm:[background:hsl(var(--primary)/0.3)] rounded-md p-2 sm:p-3 mt-4">
                <div className="absolute -top-2 -left-2 sm:top-auto sm:left-auto sm:relative w-fit sm:bg-primary/80 p-6 rounded-full text-white/40 dark:text-white/10 sm:text-white dark:sm:text-white">
                    <BuildingSVG size='80' />
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
                                <h1 className='text-[1.8em] sm:text-[2em] font-medium drop-shadow'>{institute?.collegeName}</h1>
                                <p className='opacity-90 text-center'>{institute?.description}</p>
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
                                <span>Courses: {institute?.course?.length || 0}</span>
                                <span>Subjects: {subjectCount}</span>
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

                    <div className="w-full flex justify-end items-center text-[0.8em] opacity-80">
                        {!isLoading ?
                            <span>Registered by: {institute?.registeredBy}</span>
                            :
                            <RectLoader />
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default InstituteInfo