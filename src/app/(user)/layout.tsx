import React from 'react'
import Sidebar from '@/components/Sidebar'

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