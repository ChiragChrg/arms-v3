"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import useDataStore from '@/store/useDataStore'
import { DataStoreTypes } from '@/types/dataStoreTypes'
import axios from 'axios'
import NavRoute from '@/components/NavRoutes'
import MobileHeader from '@/components/MobileHeader'
import { CircleLoader, RectLoader } from '@/components/CustomUI/Skeletons'
import BuildingSVG from '@/assets/BuildingSVG'
import BookStackSVG from '@/assets/BookStackSVG'
import toast from 'react-hot-toast'
import { PlusIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import useUserStore from '@/store/useUserStore'
import AvatarImage from '@/components/CustomUI/AvatarImage'
import DropdownSettings from '@/components/CustomUI/DropdownSettings'

type Params = {
    instituteID: string,
}

const InstituteInfo = () => {
    const [institute, setInstitute] = useState<DataStoreTypes | null | undefined>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [subjectCount, setSubjectCount] = useState<number>(0)
    const [docsCount, setDocsCount] = useState<number>(0)
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)

    const { data: globalData } = useDataStore()
    const { user, isAdmin } = useUserStore()
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
        queryKey: ['getInstitutebyID', params.instituteID],
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
            const instituteInfo = globalData.find(
                (obj) => obj.instituteName.toLowerCase().replaceAll(" ", "-") === params?.instituteID.toLowerCase()
            );
            if (instituteInfo) {
                setInstitute(instituteInfo);
                setIsLoading(false);
            }
        } else if (fetchedData) {
            // Set data fetched from TanstackQuery
            setInstitute(fetchedData);
        }
    }, [globalData, params, fetchedData]);

    useEffect(() => {
        if (institute) {
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

    // Grant DELETE access if user is ADMIN or the CREATOR
    useEffect(() => {
        if (isAdmin || user?.uid === institute?.registeredBy?._id)
            setIsAuthorized(true)
        else
            setIsAuthorized(false)
    }, [user, isAdmin, institute?.registeredBy?._id])

    return (
        <section className='section_style'>
            <NavRoute routes={["Institutions", `.${pathname}`]} />
            <MobileHeader />

            <div className="relative flex items-center gap-4 bg-radialGradient dark:bg-radialGradientDark sm:[background:hsl(var(--primary)/0.3)] rounded-md p-2 sm:p-3 mt-4">
                <div className="absolute -top-2 -left-2 sm:top-auto sm:left-auto sm:relative w-fit sm:bg-primary/80 p-6 rounded-full text-white/40 dark:text-white/10 sm:text-white dark:sm:text-white">
                    <BuildingSVG size='80' />
                </div>

                <DropdownSettings
                    title='Institute'
                    toDeleteName={institute?.instituteName as string}
                    isAuthorized={isAuthorized}
                    userID={user?.uid as string} />

                <div className="w-full flex_center flex-col gap-2 px-4 mt-8 sm:mt-0">
                    <div className="flex_center flex-col gap-2 w-full">
                        {!isLoading ?
                            <>
                                <h1 className='text-[1.8em] sm:text-[2em] font-medium drop-shadow'>{institute?.instituteName}</h1>
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

                    <div className="w-full flex justify-end items-center gap-2 text-[0.8em]">
                        <span>RegisteredBy : </span>
                        {!isLoading ?
                            <div className="flex_center gap-2">
                                <AvatarImage url={institute?.registeredBy?.avatarImg} size={25} />

                                <span>{institute?.registeredBy?.username}</span>
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
                <h2 className='text-[1.7em] font-medium'>Courses</h2>
                {user?.isApproved &&
                    <Link href={`./${institute?.instituteName.toLowerCase().replaceAll(" ", "-")}/create`} className='flex_center gap-2 text-[1em] bg-primary text-white rounded-sm px-2 py-1.5'>
                        <PlusIcon />
                        <span>Create</span>
                        <span className='hidden sm:block'>Course</span>
                    </Link>
                }
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1.25em] mb-6">
                {!isLoading ?
                    institute?.course?.map((obj, index) => (
                        <Link
                            href={`${pathname}/${obj?.courseName?.toLowerCase().replaceAll(" ", "-")}`}
                            key={index}
                            className="flex_center flex-col w-full h-full rounded-md bg-radialGradient dark:bg-radialGradientDark px-2 py-4 sm:hover:translate-y-[-0.3em] transition-transform duration-200">
                            <div className="w-fit bg-primary/80 p-4 rounded-full mb-4 text-white">
                                <BookStackSVG size='40' />
                            </div>
                            <span className="text-[1.4em] font-medium">{obj?.courseName}</span>
                            <p className="w-full max-h-[45px] text-center text-[0.925em] opacity-80">{obj?.courseDesc}</p>
                        </Link>
                    ))
                    :
                    <>
                        <RectLoader height='11em' radius={0.375} />
                        <RectLoader height='11em' radius={0.375} />
                        <RectLoader height='11em' radius={0.375} />
                        <RectLoader height='11em' radius={0.375} />
                        <RectLoader height='11em' radius={0.375} />
                        <RectLoader height='11em' radius={0.375} />
                    </>
                }
            </div>
        </section>
    )
}

export default InstituteInfo