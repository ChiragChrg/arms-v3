"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import ThemeButton from './CustomUI/ThemeButton'
import Logo from '@/assets/Logo'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { MenuIcon, X } from 'lucide-react'

type Props = {
    altLogo?: boolean,
    altColor?: boolean,
    className?: string
}

const Header = ({ altLogo = false, altColor = false, className = "" }: Props) => {
    const [showNav, setShowNav] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem('arms-user') as string)

        if (localUser) {
            router.push('/dashboard')
        }
    }, [router])

    useEffect(() => {
        if (showNav) {
            document.body.style.userSelect = "none"
        }
    }, [showNav])

    return (
        <header className={cn('flex justify-between items-center z-10', className)}>
            <div className="flex_center gap-3">
                <Logo
                    size='35'
                    fill={altLogo ? "#fff" : "var(--logoClr)"}
                    stroke={altLogo ? "var(--logoClr)" : "rgba(0, 0, 0, 0.5)"} />
                <p
                    style={{
                        color: altLogo ? "#fff" : "var(--logoClr)"
                    }}
                    className='text-[2em] font-bold leading-8'>ARMS</p>
            </div>

            <MenuIcon size={40} className='sm:hidden text-logoClr dark:text-white' onClick={() => setShowNav(true)} />

            <div
                style={{
                    transform: `translateX(${showNav ? "0" : "100%"})`,
                    pointerEvents: showNav ? "auto" : "none",
                    userSelect: showNav ? "auto" : "none",
                }}
                className='sm:hidden fixed inset-0 flex flex-col z-50 transition-transform duration-500'>
                <nav className='w-[60%] h-full ml-auto flex flex-col justify-start items-center gap-4 pt-8 bg-background shadow text-[1.5em] tracking-wider'>
                    <X size={50} className='bg-primary/80 text-white rounded-full p-1 mb-8' onClick={() => setShowNav(false)} />

                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="https://chiragchrg.netlify.app/" target='_blank'>Portfolio</Link>
                    <Link href="https://github.com/ChiragChrg" target='_blank'>GitHub</Link>

                    <ThemeButton size={40} className='mt-8 dark:bg-background dark:text-white' />
                </nav>
            </div>

            <nav
                className={cn('hidden sm:flex items-center gap-8 text-[1.1em] drop-shadow-md', altColor && "text-white")}>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="https://chiragchrg.netlify.app/" target='_blank'>Portfolio</Link>
                <Link href="https://github.com/ChiragChrg" target='_blank'>GitHub</Link>

                <ThemeButton />
            </nav>
        </header>
    )
}

export default Header