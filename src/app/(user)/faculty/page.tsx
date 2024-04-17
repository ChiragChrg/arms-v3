"use client"
import { useLayoutEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import useUserStore from '@/store/useUserStore'
import MobileHeader from '@/components/MobileHeader'
import { User2, UserCheck } from 'lucide-react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import AvatarImage from '@/components/CustomUI/AvatarImage'
import ManageFaculty from '@/components/CustomUI/ManageFaculty'

interface FacultyType {
    _id: string,
    username: string,
    email: string,
    avatarImg: string,
    isApproved: boolean,
    createdAt: string,
}

const Faculty = () => {
    const { isAdmin, isLoading } = useUserStore()
    const router = useRouter()

    // Redirect NON-ADMIN users back to dashboard
    useLayoutEffect(() => {
        if (!isLoading && !isAdmin) {
            router.push("/dashboard")
        }
    }, [isAdmin, router, isLoading])

    const { data } = useQuery({
        queryKey: ["facultyList"],
        queryFn: async () => {
            const { data } = await axios.get("/api/get/faculty")
            const reqUserCount: number = data?.filter((user: FacultyType) => user?.isApproved === false).length;
            return { faculties: data as FacultyType[], reqUserCount }
        }
    })

    if (isAdmin)
        return (
            <section className='section_style'>
                <MobileHeader />

                <div className="flex justify-between items-center">
                    <h1 className='text-[1.6em] sm:text-[2em] font-bold'>
                        <span className='hidden sm:inline'>Approved</span>
                        <span className="sm:text-primary"> Faculty</span>
                    </h1>

                    {isAdmin &&
                        <Link href="./faculty/request" className='flex_center gap-2 text-[1em] bg-primary text-white rounded-sm px-2 py-1.5'>
                            <UserCheck />
                            <span className='hidden sm:block'>Pending</span>
                            <div className='relative flex_center gap-2'>Request
                                {data?.reqUserCount != 0 &&
                                    <span className='flex_center w-6 aspect-square rounded-full bg-white text-primary font-bold text-[0.7em]'>{data?.reqUserCount}</span>}
                            </div>
                        </Link>
                    }
                </div>

                {/* Table Ui for Desktop screen */}
                <Table className='hidden xl:table mt-4'>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="px-2 sm:px-4 py-2">Username</TableHead>
                            <TableHead className="px-2 sm:px-4 py-2">Email</TableHead>
                            <TableHead className='px-2 sm:px-4 py-2 sm:table-cell'>DOJ</TableHead>
                            <TableHead className="px-2 sm:px-4 py-2 w-fit text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.faculties?.map((faculty, index) => {
                            if (!faculty?.isApproved) return

                            // Date Formating
                            const date = new Date(faculty?.createdAt);
                            const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
                            const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
                            const hideActionBtn = faculty?._id !== process.env.NEXT_PUBLIC_ARMS_ADMIN_UID

                            return (
                                <TableRow key={index}>
                                    <TableCell className="px-2 sm:px-4 py-2 flex items-center gap-3">
                                        <AvatarImage url={faculty?.avatarImg} size={40} />
                                        <span className='font-medium capitalize'>{faculty?.username}</span>
                                    </TableCell>
                                    <TableCell className="px-2 sm:px-4 py-2">{faculty?.email}</TableCell>
                                    <TableCell className='px-2 sm:px-4 py-2 sm:table-cell'>{formattedDate}</TableCell>
                                    <TableCell className='px-2 sm:px-4 py-2 sm:table-cell text-center'>
                                        {hideActionBtn && <ManageFaculty
                                            facultyName={faculty?.username}
                                            facultyUid={faculty?._id}
                                        />}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

                {/* Card Ui for Mobile screen */}
                <div className="grid xl:hidden grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {data?.faculties?.map((faculty, index) => {
                        if (!faculty?.isApproved) return
                        const hideActionBtn = faculty?._id !== process.env.NEXT_PUBLIC_ARMS_ADMIN_UID

                        return (
                            <div key={index} className="flex justify-between items-center border border-secondary rounded-md px-1 py-0.5">
                                <div className="flex items-center gap-4">
                                    {faculty?.avatarImg ?
                                        <Image
                                            src={faculty?.avatarImg}
                                            alt='User_Avatar'
                                            width={40}
                                            height={40}
                                            loading='eager'
                                            className='rounded-full'
                                        />
                                        :
                                        <div className="bg-slate-500 w-fit p-1.5 rounded-full">
                                            <User2 size={30} />
                                        </div>
                                    }

                                    <div className="flex flex-col">
                                        <span className='font-medium capitalize'>{faculty?.username}</span>
                                        <span className='text-[0.8em] opacity-80'>{faculty?.email}</span>
                                    </div>
                                </div>

                                {hideActionBtn && <ManageFaculty
                                    facultyName={faculty?.username}
                                    facultyUid={faculty?._id}
                                />}
                            </div>
                        )
                    })}
                </div>
            </section>
        )
}

export default Faculty