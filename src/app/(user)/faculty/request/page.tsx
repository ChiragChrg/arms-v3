"use client"
import { useLayoutEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import axios from 'axios'
import useUserStore from '@/store/useUserStore'
import MobileHeader from '@/components/MobileHeader'
import { useQuery } from '@tanstack/react-query'
import NavRoute from '@/components/NavRoutes'
import { EmptyApprovalVector } from '@/assets/SVGs'
import UserCard from './UserCard'


export interface FacultyType {
    _id: string,
    username: string,
    email: string,
    avatarImg: string,
    isApproved: boolean,
    createdAt: string,
}

const Request = () => {
    const { isAdmin } = useUserStore()
    const router = useRouter()

    // Redirect NON-ADMIN users back to dashboard
    useLayoutEffect(() => {
        if (!isAdmin) {
            router.push("/dashboard")
        }
    }, [isAdmin, router])

    const { data: users } = useQuery({
        queryKey: ["facultyRequestList"],
        queryFn: async () => {
            const { data } = await axios.get("/api/get/pending-approval")
            return data as FacultyType[]
        }
    })

    if (isAdmin)
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
                            if (user?.isApproved) return //if True return

                            return (
                                <UserCard key={index} user={user} />
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