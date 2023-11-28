"use client"
import Image from 'next/image'
import axios from 'axios'
import MobileHeader from '@/components/MobileHeader'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import NavRoute from '@/components/NavRoutes'
import { CheckIcon, Loader, X } from 'lucide-react'
import { EmptyApprovalVector } from '@/assets'

interface FacultyType {
    uid: string,
    username: string,
    email: string,
    avatarImg: string,
    isApproved: boolean,
    createdAt: string,
}

const Request = () => {
    const { data: users } = useQuery({
        queryKey: ["facultyRequestList"],
        queryFn: async () => {
            const { data } = await axios.get("/api/getapproval")
            return data as FacultyType[]
        }
    })

    return (
        <section className='section_style'>
            <MobileHeader />
            <NavRoute routes={["faculty", "./faculty/request"]} />

            <h1 className='text-[1.6em] sm:text-[2em] font-bold'>
                <span>Pending</span>
                <span className="text-primary"> Request</span>
            </h1>

            {users?.length !== 0 ?
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
                :
                <div className="flex_center flex-col gap-4 h-[80%]">
                    <Image src={EmptyApprovalVector} width={250} height={250} alt='EmptyApprovalVector' className='md:w-[400px]' />
                    <span className='text-[1.25em]'>No new faculty requests</span>
                </div>
            }
        </section>
    )
}

export default Request