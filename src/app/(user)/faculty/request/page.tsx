"use client"
import Image from 'next/image'
import MobileHeader from '@/components/MobileHeader'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { Button } from '@/components/ui/button'
import { CheckIcon, Loader, X } from 'lucide-react'
import NavRoute from '@/components/NavRoutes'

interface FacultyType {
    uid: string,
    username: string,
    email: string,
    avatarImg: string,
    isApproved: boolean,
    createdAt: string,
}

const Request = () => {
    const queryClient = useQueryClient()
    const users: FacultyType[] | undefined = queryClient.getQueryData(["facultyList"])

    return (
        <section className='section_style'>
            <MobileHeader />
            <NavRoute routes={["faculty", "./faculty/request"]} />

            <h1 className='text-[1.6em] sm:text-[2em] font-bold'>
                <span>Pending</span>
                <span className="text-primary"> Request</span>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 my-4">
                {users?.map((user, index) => {
                    if (!user?.isApproved) return //ifTruw return

                    return (
                        <div key={index} className="flex_center flex-col gap-1 rounded-md py-4 bg-radialGradientDark dark:bg-radialGradientDark">
                            <Image
                                src={user?.avatarImg}
                                width={80}
                                height={80}
                                alt='User_Image'
                                className='rounded-full' />

                            <h3>{user?.username}</h3>
                            <span className='text-[0.8em] opacity-80'>{user?.email}</span>

                            <div className="flex_center gap-4 mt-2 w-full px-8">
                                <Button className='flex_center gap-1 px-2 py-1 min-w-[90px] w-full h-fit text-[0.8em] bg-green-500 hover:bg-green-600 text-white drop-shadow'>
                                    {false ?
                                        <Loader size={20} className='animate-spin' />
                                        :
                                        <CheckIcon size={20} />}
                                    <span>Approve</span>
                                </Button>

                                <Button variant="destructive" className='flex_center gap-1 px-2 py-1 min-w-[90px] w-full h-fit text-[0.8em] text-white drop-shadow'>
                                    <X size={20} />
                                    <span>Reject</span>
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Request