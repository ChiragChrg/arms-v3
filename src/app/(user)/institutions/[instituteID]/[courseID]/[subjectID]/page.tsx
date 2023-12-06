"use client"
import React, { useEffect, useState } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import useDataStore from '@/store/useDataStore'
import { DataStoreTypes, subjectType } from '@/types/dataStoreTypes'
import NavRoute from '@/components/NavRoutes'
import MobileHeader from '@/components/MobileHeader'
import { Button } from '@/components/ui/button'
import { RectLoader } from '@/components/CustomUI/Skeletons'
import OpenBookSVG from '@/assets/OpenBookSVG'
import { DownloadCloudIcon, PlusIcon, Settings2Icon, Trash2Icon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useUserStore from '@/store/useUserStore'
import Link from 'next/link'

type Params = {
    instituteID: string,
    courseID: string,
    subjectID: string
}

const SubjectInfo = () => {
    const [subject, setSubject] = useState<subjectType | null | undefined>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const { data: globalData } = useDataStore()
    const { user, isAdmin } = useUserStore()
    const pathname = usePathname()
    const params = useParams<Params>()
    const router = useRouter()

    const fetchInstitute = async () => {
        const collegeName = params?.instituteID.replaceAll("-", " ");
        const { data, status } = await axios.post('/api/getinstitute', { collegeName });

        if (status == 200) {
            setIsLoading(false)
            return data as DataStoreTypes;
        } else {
            console.error(data)
        }
    }

    const { data: fetchedData, isError } = useQuery({
        queryKey: ['getSubjectbyID', params.subjectID],
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
            const instituteInfo = globalData.find(obj => obj.collegeName.toLowerCase().replaceAll(" ", "-") === params?.instituteID.toLowerCase())
            const courseInfo = instituteInfo?.course?.find(obj => obj?.courseName.toLowerCase().replaceAll(" ", "-") === params?.courseID.toLowerCase())
            const subjectInfo = courseInfo?.subjects?.find(obj => obj?.subjectName.toLowerCase().replaceAll(" ", "-") === params?.subjectID.toLowerCase())
            setSubject(subjectInfo)
            setIsLoading(false)
        } else if (fetchedData) {
            // Set data fetched from TanstackQuery
            const courseInfo = fetchedData?.course?.find((obj) => obj?.courseName.toLowerCase().replaceAll(" ", "-") === params?.courseID.toLowerCase())
            const subjectInfo = courseInfo?.subjects?.find((subj) => subj?.subjectName.toLowerCase().replaceAll(" ", "-") === params?.subjectID.toLowerCase())

            setSubject(subjectInfo)
        }
    }, [globalData, params, fetchedData]);

    return (
        <section className='section_style'>
            <NavRoute routes={["Institutions", `Institutions/${params?.instituteID}`, `Institutions/${params?.instituteID}/${params?.courseID}`, `.${pathname}`]} />
            <MobileHeader />

            <div className="relative flex items-center gap-4 bg-radialGradient dark:bg-radialGradientDark sm:[background:hsl(var(--primary)/0.3)] rounded-md p-2 sm:p-3 mt-4">
                <div className="absolute -top-2 -left-2 sm:top-auto sm:left-auto sm:relative w-fit sm:bg-primary/80 p-6 rounded-full text-white/40 dark:text-white/10 sm:text-white dark:sm:text-white">
                    <OpenBookSVG size='80' />
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
                                <h1 className='text-[1.8em] sm:text-[2em] font-medium drop-shadow'>{subject?.subjectName}</h1>
                                <p className='opacity-90 text-center'>{subject?.subjectDesc}</p>
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
                                <span>Documents: {subject?.subjectDocs?.length || 0}</span>
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
                            <span>Registered by: {subject?.subjectCreator}</span>
                            :
                            <RectLoader />
                        }
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center py-4">
                <h2 className='text-[1.7em] font-medium'>Documents</h2>
                {user?.isApproved &&
                    <Link href={`./${subject?.subjectName.toLowerCase().replaceAll(" ", "-")}/upload`} className='flex_center gap-2 text-[1em] bg-primary text-white rounded-sm px-2 py-1.5'>
                        <PlusIcon />
                        <span>Upload</span>
                        <span className='hidden sm:block'>Document</span>
                    </Link>
                }
            </div>

            <Table className='mb-6'>
                <TableHeader>
                    <TableRow>
                        <TableHead className="px-2 sm:px-4 py-2 min-w-max">File Name</TableHead>
                        <TableHead className="px-2 sm:px-4 py-2 w-[85px]">Size</TableHead>
                        <TableHead className='px-2 sm:px-4 py-2 hidden sm:table-cell'>Uploader</TableHead>
                        <TableHead className='px-2 sm:px-4 py-2 sm:table-cell'>Date</TableHead>
                        <TableHead className="px-2 sm:px-4 py-2 w-fit text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subject?.subjectDocs?.map((doc, index) => {
                        // File Size Formating
                        const formatDataSize = (bytes: number): string => {
                            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
                            if (bytes === 0) return '0 Byte';

                            const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString(), 10);
                            const sizeInUnit = bytes / Math.pow(1024, i);

                            const formattedSize = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(sizeInUnit);
                            return formattedSize + ' ' + sizes[i];
                        };

                        // Date Formating
                        const date = new Date(doc?.docCreated);
                        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
                        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

                        return (
                            <TableRow key={index}>
                                <TableCell className="px-2 sm:px-4 py-2 font-medium capitalize">{doc?.docName}</TableCell>
                                <TableCell className="px-2 sm:px-4 py-2 ">{formatDataSize(parseInt(doc?.docSize))}</TableCell>
                                <TableCell className='px-2 sm:px-4 py-2 hidden sm:table-cell'>{doc?.docUploader?.username}</TableCell>
                                <TableCell className='px-2 sm:px-4 py-2 sm:table-cell'>{formattedDate}</TableCell>
                                <TableCell className="px-2 sm:px-4 py-2 text-right flex_center flex-col sm:flex-row gap-2">
                                    <Button size='icon' title='Download' className='w-full text-white'>
                                        <a href={doc?.docLink} target='_blank'>
                                            <DownloadCloudIcon />
                                        </a>
                                    </Button>
                                    {isAdmin &&
                                        <Button variant='destructive' size='icon' title='Delete' className='w-full bg-red-500 hover:bg-red-500/90 text-white'>
                                            <Trash2Icon />
                                        </Button>
                                    }
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </section>
    )
}

export default SubjectInfo