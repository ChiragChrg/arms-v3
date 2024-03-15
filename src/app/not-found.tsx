"use client"
import React, { useEffect } from 'react'
import { Metadata } from 'next/types'
import dynamic from 'next/dynamic'

const Logo = dynamic(() => import('@/assets/Logo'))
const Header = dynamic(() => import('@/components/Header'))
import useLoaderStore from '@/store/useLoaderStore'

export const metadata: Metadata = {
    title: '404 Not Found | ARMS',
}

const NotFound = () => {
    const { setShowLoader } = useLoaderStore()

    useEffect(() => {
        setShowLoader(false)
    }, [setShowLoader])

    return (
        <main className='relative flex flex-col px-4 py-3 w-full h-full min-h-screen overflow-hidden'>
            <Header disableAuthRedirect={true} />

            <section className='w-full h-full flex_center flex-grow flex-col gap-14 px-3 2xl:px-4'>
                <Logo stroke='hsl(222.2 84% 4.9%)' size='150' className='z-10 rotate-[-65deg]' />

                <h1 className='text-[1.5em] font-medium'><span className="text-primary font-bold">404</span> : PAGE NOT FOUND</h1>
            </section>
        </main>
    )
}

export default NotFound