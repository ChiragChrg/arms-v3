"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import useDataStore from '@/store/useDataStore'
import { DataStoreTypes, courseType } from '@/types/dataStoreTypes'
import NavRoute from '@/components/NavRoutes'
import MobileHeader from '@/components/MobileHeader'
import { CircleLoader, RectLoader } from '@/components/CustomUI/Skeletons'
import BookStackSVG from '@/assets/BookStackSVG'
import OpenBookSVG from '@/assets/OpenBookSVG'
import { PlusIcon, Settings2Icon, Trash2Icon, User2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import useUserStore from '@/store/useUserStore'
import AvatarImage from '@/components/CustomUI/AvatarImage'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Params = {
    instituteID: string,
    courseID: string
}

const CourseInfo = () => {
    const [course, setCourse] = useState<courseType | null | undefined>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [docsCount, setDocsCount] = useState<number>(0)

    const { data: globalData } = useDataStore()
    const { user } = useUserStore()
    const pathname = usePathname()
    const params = useParams<Params>()
    const router = useRouter()

    const fetchInstitute = async () => {
        const instituteName = params?.instituteID.replaceAll("-", " ");
        const { data, status } = await axios.post('/api/post/get-institute', { instituteName });

        if (status == 200) {
            setIsLoading(false)
            return data as DataStoreTypes;
        } else {
            console.error(data)
        }
    }

    const { data: fetchedData, isError } = useQuery({
        queryKey: ['getCoursebyID', params.courseID],
        queryFn: fetchInstitute,
        enabled: globalData === null, //Fetch only if globalData is Null
        refetchOnMount: true
    });

    if (isError) {
        toast.error("Error while fetching Institute")
        router.push('/institutions')
    }

    useEffect(() => {
        if (globalData !== null) {
            const instituteInfo = globalData.find(obj => obj.instituteName.toLowerCase().replaceAll(" ", "-") === params?.instituteID.toLowerCase())
            const courseInfo = instituteInfo?.course?.find(obj => obj?.courseName.toLowerCase().replaceAll(" ", "-") === params?.courseID.toLowerCase())
            setCourse(courseInfo)
            setIsLoading(false)
        } else if (fetchedData) {
            // Set data fetched from TanstackQuery
            const courseInfo = fetchedData?.course?.find((obj) => obj?.courseName.toLowerCase().replaceAll(" ", "-") === params?.courseID.toLowerCase())
            setCourse(courseInfo);
        }
    }, [globalData, params, fetchedData]);

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

            <div className="relative flex items-center gap-4 bg-radialGradient dark:bg-radialGradientDark sm:[background:hsl(var(--primary)/0.3)] rounded-md p-2 sm:p-3 mt-4">
                <div className="absolute -top-2 -left-2 sm:top-auto sm:left-auto sm:relative w-fit sm:bg-primary/80 p-6 rounded-full text-white/40 dark:text-white/10 sm:text-white dark:sm:text-white">
                    <BookStackSVG size='80' />
                </div>

                <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger className='bg-background/80 p-2 rounded-md'>
                            <Settings2Icon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='mr-7 border border-primary/50 bg-background/80 backdrop-blur'>
                            <DropdownMenuLabel>Manage Course</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='flex_center gap-2 cursor-pointer'>
                                <User2 size={18} />
                                <span>Creator Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='flex_center gap-2 !text-red-600 cursor-pointer'>
                                <Trash2Icon size={18} />
                                <span>Delete Course</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

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

                    <div className="w-full flex justify-end items-center gap-2 text-[0.8em]">
                        <span>RegisteredBy : </span>
                        {!isLoading ?
                            <div className="flex_center gap-2">
                                <AvatarImage url={course?.courseCreator?.avatarImg} size={25} />
                                <span>{course?.courseCreator?.username}</span>
                            </div>
                            :
                            <div className="w-[150px] flex_center gap-2">
                                <CircleLoader size='25px' />
                                <RectLoader height='20px' />
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center py-4">
                <h2 className='text-[1.7em] font-medium'>Subjects</h2>
                {user?.isApproved &&
                    <Link href={`./${course?.courseName.toLowerCase().replaceAll(" ", "-")}/create`} className='flex_center gap-2 text-[1em] bg-primary text-white rounded-sm px-2 py-1.5'>
                        <PlusIcon />
                        <span>Create</span>
                        <span className='hidden sm:block'>Subject</span>
                    </Link>
                }
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1.25em]">
                {course?.subjects?.map((obj, index) => (
                    <Link
                        href={`${pathname}/${obj?.subjectName?.toLowerCase().replaceAll(" ", "-")}`}
                        key={index}
                        className="flex_center flex-col w-full h-full rounded-md bg-radialGradient dark:bg-radialGradientDark px-2 py-4 sm:hover:translate-y-[-0.3em] transition-transform duration-200">
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

export default CourseInfo