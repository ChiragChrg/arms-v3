"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

const Dashboard = () => {
    const { data: session, status } = useSession()

    console.log(session, status)
    return (
        <section className='w-full h-full overflow-y-auto'>
            <div className=" bg-red-600">Dashboard</div>
        </section>
    )
}

export default Dashboard