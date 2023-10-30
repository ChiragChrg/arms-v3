import React from 'react'
import type { Metadata } from 'next'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
    title: 'ARMS | Academic Resource Management System',
    description: 'Academic Resource Management System (ARMS) is a software which is developed for the Education system. Teachers can upload study materials and Students can download those files.',
}

type layoutProps = {
    children: React.ReactNode
}

const Layout = ({ children }: layoutProps) => {
    return (
        <main className='flex gap-3 bg-background p-2 h-screen overflow-hidden relative'>
            <Sidebar />
            {children}
        </main>
    )
}

export default Layout