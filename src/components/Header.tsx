"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import useUserStore, { UserTypes } from '@/store/useUserStore'
import useLoaderStore from '@/store/useLoaderStore'
import { cn } from '@/lib/utils'
import PWA from '@/lib/pwa'

import Logo from '@/assets/Logo'
import HamMenuSVG from '@/assets/HamMenuSVG'
import ThemeButton from './CustomUI/ThemeButton'
import { X } from 'lucide-react'

type Props = {
    altLogo?: boolean,
    altColor?: boolean,
    className?: string,
    disableAuthRedirect?: boolean
}

type HomeRouteType = {
    path: string,
    name: string
}

const Header = ({ altLogo = false, altColor = false, className = "", disableAuthRedirect = false }: Props) => {
    const [showNav, setShowNav] = useState<boolean>(false)
    const [homeRoute, setHomeRoute] = useState<HomeRouteType>({ path: "/", name: "Home" })
    const router = useRouter()
    const { user } = useUserStore()
    const { setShowLoader } = useLoaderStore()
    const { status } = useSession()

    useEffect(() => {
        const anonymousUser: UserTypes = JSON.parse(localStorage.getItem('arms-anonymous-user') as string)

        if ((anonymousUser?.uid === "anonymous" || status === "authenticated") && !disableAuthRedirect) {
            router.push('/dashboard')
        } else {
            setTimeout(() => {
                setShowLoader(false)
            }, 2500)
        }
    }, [router, disableAuthRedirect, status, setShowLoader])

    useEffect(() => {
        if (showNav) {
            document.body.style.userSelect = "none"
        }
    }, [showNav])

    useEffect(() => {
        if (user?.uid) {
            setHomeRoute({
                path: "/dashboard",
                name: "Dashboard"
            })
        }
    }, [user])

    // Listening to PWA BeforeInstallPrompt
    useEffect(() => {
        PWA()
    }, [])

    return (
        <header className={cn('flex justify-between items-center z-20', className)}>
            <div className="flex_center gap-3">
                <Logo
                    size='35'
                    fill={altLogo ? "#fff" : "var(--logoClr)"}
                    stroke={altLogo ? "var(--logoClr)" : "rgba(0, 0, 0, 0.5)"} />
                <h1
                    style={{
                        color: altLogo ? "#fff" : "var(--logoClr)"
                    }}
                    className='text-[2em] font-bold leading-8'>ARMS</h1>
            </div>

            {/* Mobile navigation */}
            <div onClick={() => setShowNav(true)} >
                <HamMenuSVG size="40" className='lg:hidden text-logoClr dark:text-white -scale-x-100' />
            </div>

            <div
                style={{
                    transform: `translateX(${showNav ? "0" : "100%"})`,
                    pointerEvents: showNav ? "auto" : "none",
                    userSelect: showNav ? "auto" : "none",
                }}
                className='lg:hidden fixed inset-0 flex flex-col z-50 transition-transform duration-500'>
                <nav className='w-[60%] h-full ml-auto flex flex-col justify-start items-center gap-4 pt-8 bg-background shadow text-[1.5em] tracking-wider'>
                    <X size={45} className='bg-primary/80 text-white rounded-full p-2 mb-8' onClick={() => setShowNav(false)} />

                    <Link href={homeRoute?.path}>{homeRoute?.name}</Link>
                    <Link href="/about">About</Link>
                    <Link href="https://chiragchrg.netlify.app/" target='_blank'>Portfolio</Link>
                    <Link href="https://github.com/ChiragChrg" target='_blank'>GitHub</Link>

                    <ThemeButton size={40} className='mt-8 dark:bg-background dark:text-white border-0' />
                </nav>
            </div>

            {/* Desktop Navigation */}
            <nav
                className={cn('hidden lg:flex items-center gap-8 text-[1.1em] drop-shadow-md', altColor && "text-white")}>
                <Link href={homeRoute?.path}>{homeRoute?.name}</Link>
                <Link href="/about">About</Link>
                <Link href="https://chiragchrg.netlify.app/" target='_blank'>Portfolio</Link>
                <Link href="https://github.com/ChiragChrg" target='_blank'>GitHub</Link>

                <ThemeButton />
            </nav>
        </header>
    )
}

export default Header