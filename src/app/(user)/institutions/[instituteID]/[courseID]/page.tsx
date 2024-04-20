"use client"
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getInstitution } from '@/app/actions/DocsActions'
import useUserStore from '@/store/useUserStore'
import { DataStoreTypes, courseType } from '@/types/dataStoreTypes'

import NavRoute from '@/components/NavRoutes'
import MobileHeader from '@/components/MobileHeader'
import AvatarImage from '@/components/CustomUI/AvatarImage'
import DropdownSettings from '@/components/CustomUI/DropdownSettings'
import { CircleLoader, RectLoader } from '@/components/CustomUI/Skeletons'

import BookStackSVG from '@/assets/Icons/BookStackSVG'
import OpenBookSVG from '@/assets/Icons/OpenBookSVG'
import toast from 'react-hot-toast'
import { PlusIcon } from 'lucide-react'

type Params = {
    instituteID: string,
    courseID: string
}

const CourseInfo = () => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    const { user, isAdmin } = useUserStore()
    const pathname = usePathname()
    const params = useParams<Params>()
    const router = useRouter()
    const queryClient = useQueryClient()

    const { data: course, isError, isLoading } = useQuery({
        queryKey: ['getInstitutebyName', params?.instituteID, params?.courseID],
        queryFn: async () => {
            try {
                const instituteName = params?.instituteID?.replaceAll("-", " ");
                const res = await getInstitution(instituteName) as DataStoreTypes;
                const courseData = res?.course?.find((obj) => obj?.courseName.toLowerCase().replaceAll(" ", "-") === params?.courseID.toLowerCase()) || {} as courseType
                return courseData;
            } catch (error) {
                console.error('Error fetching institutions:', error);
                throw new Error('Failed to fetch institutions data');
            }
        },
        initialData: () => {
            const init = queryClient.getQueryData(['getInstitutebyName', params?.instituteID, params?.courseID]) as DataStoreTypes
            const courseData = init?.course?.find((obj) => obj?.courseName.toLowerCase().replaceAll(" ", "-") === params?.courseID.toLowerCase()) as courseType
            return courseData
        },
        initialDataUpdatedAt: () => queryClient.getQueryState(['getInstitutebyName', params?.instituteID, params?.courseID])?.dataUpdatedAt,
    });

    if (isError) {
        toast.error("Error while fetching Course")
        router.push(`/institutions/${params?.instituteID}`)
    }

    const docsCount = useMemo(() => {
        let totalDocs = 0

        if (course) {
            course?.subjects?.forEach((subjectObj) => {
                subjectObj?.units?.forEach((unitObj) => {
                    totalDocs += unitObj?.unitDocs?.length || 0
                })
            })
        }

        return totalDocs
    }, [course])

    // Grant DELETE access if user is ADMIN or the CREATOR
    useEffect(() => {
        if (isAdmin || user?.uid === course?.courseCreator?._id)
            setIsAuthorized(true)
        else
            setIsAuthorized(false)
    }, [user, isAdmin, course?.courseCreator?._id])

    return (
        <section className='section_style'>
            <NavRoute routes={["Institutions", `Institutions/${params?.instituteID}`, `.${pathname}`]} />
            <MobileHeader />

            <div className="relative flex items-center gap-4 bg-radialGradient dark:bg-radialGradientDark sm:[background:hsl(var(--primary)/0.3)] rounded-md p-2 sm:p-3 mt-4">
                <div className="absolute -top-2 -left-2 sm:top-auto sm:left-auto sm:relative w-fit sm:bg-primary/80 p-6 rounded-full text-white/40 dark:text-white/10 sm:text-white dark:sm:text-white">
                    <BookStackSVG size='80' />
                </div>

                <DropdownSettings
                    title='Course'
                    toDeleteName={course?.courseName as string}
                    isAuthorized={isAuthorized}
                    userID={user?.uid as string}
                    documentData={course as courseType} />

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
                    <Link href={`./${course?.courseName?.toLowerCase().replaceAll(" ", "-")}/create`} className='flex_center gap-2 text-[1em] bg-primary text-white rounded-sm px-2 py-1.5'>
                        <PlusIcon />
                        <span>Create</span>
                        <span className='hidden sm:block'>Subject</span>
                    </Link>
                }
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.25em]">
                {course?.subjects?.map((obj, index) => (
                    <Link
                        href={`${pathname}/${obj?.subjectName?.toLowerCase().replaceAll(" ", "-")}`}
                        key={index}
                        className="flex_center flex-col w-full h-full rounded-md bg-radialGradient dark:bg-radialGradientDark px-2 py-4">
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