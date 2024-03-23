"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useSidebarStore from '@/store/useSidebarStore'
import BuildingSVG from '@/assets/Icons/BuildingSVG'
import Logo from '@/assets/Icons/Logo'
import { cn } from '@/lib/utils'
import UserAvatar from './UserAvatar'
import ThemeButton from './CustomUI/ThemeButton'
import { BadgeInfoIcon, PieChart, Settings2, Users2, X } from 'lucide-react'
import useUserStore from '@/store/useUserStore'
import PWA from '@/lib/pwa'

const Sidebar = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [isTablet, setIsTablet] = useState<boolean>(false)
    const { showSidebar, setShowSidebar } = useSidebarStore()
    const pathname = usePathname()
    const { isAdmin } = useUserStore()

    useEffect(() => {
        const updateScreenWidth = () => {
            if (typeof window === 'undefined') return

            if (window.innerWidth <= 540) {
                setIsMobile(true);
                setIsTablet(false);
                setShowSidebar(false);
            } else if (window.innerWidth <= 1023) {
                setIsMobile(true);
                setIsTablet(true);
                setShowSidebar(false);
            } else {
                setIsMobile(false);
                setIsTablet(false);
                setShowSidebar(true);
            }
        }

        updateScreenWidth() //Initial Call
        window.addEventListener('resize', updateScreenWidth)
        return () => window.removeEventListener('resize', updateScreenWidth)
    }, [setShowSidebar])

    useEffect(() => {
        // Listening to PWA BeforeInstallPrompt
        PWA()
    }, [])

    return (
        <header
            style={{
                transform: isMobile ? `translateX(${showSidebar ? "0" : "-150%"})` : `translateX(0)`,
                pointerEvents: showSidebar ? "auto" : "none",
                userSelect: showSidebar ? "auto" : "none",
                width: isTablet ? "50%" : "auto"
            }}
            className='lg:min-w-[18em] fixed inset-2 lg:inset-auto lg:relative lg:h-full p-3 rounded-2xl lg:rounded-md flex flex-col gap-4 bg-background/10 backdrop-blur-xl z-10 transition-transform duration-500 ease-in-out overflow-hidden'>
            <div
                className="flex_center lg:hidden mx-auto border border-white text-white rounded-full p-1"
                onClick={() => { isMobile && setShowSidebar(false) }}>
                <X size={30} />
            </div>

            <div className="w-full flex justify-between items-center text-white">
                <div className='flex_center gap-2'>
                    <Logo
                        size='35'
                        fill="#fff"
                        stroke="rgba(0, 0, 0, 0.5)" />
                    <p className='text-[2em] font-bold leading-8'>ARMS</p>
                </div>

                <ThemeButton />
            </div>

            <nav className='flex justify-between items-center flex-col gap-4 lg:gap-2 w-full mt-4 font-medium'>
                <Link href={`/dashboard`}
                    onClick={() => { isMobile && setShowSidebar(false) }}
                    className={cn('sidebar_link_style',
                        pathname === `/dashboard` && "text-baseClr bg-white dark:bg-white")}>
                    <PieChart size={20} />
                    <span>Dashboard</span>
                </Link>

                <Link href={`/institutions`}
                    onClick={() => { isMobile && setShowSidebar(false) }}
                    className={cn('sidebar_link_style',
                        pathname === `/institutions` && "text-baseClr bg-white dark:bg-white")}>
                    <BuildingSVG size="20" />
                    <span>Institutions</span>
                </Link>

                {isAdmin && <Link href={`/faculty`}
                    onClick={() => { isMobile && setShowSidebar(false) }}
                    className={cn('sidebar_link_style',
                        pathname === `/faculty` && "text-baseClr bg-white dark:bg-white")}>
                    <Users2 size="20" />
                    <span>Faculty</span>
                </Link>}

                <Link href={`/settings`}
                    onClick={() => { isMobile && setShowSidebar(false) }}
                    className={cn('sidebar_link_style',
                        pathname === `/settings` && "text-baseClr bg-white dark:bg-white")}>
                    <Settings2 size={20} />
                    <span>Settings</span>
                </Link>

                <Link href={`/about`}
                    onClick={() => { isMobile && setShowSidebar(false) }}
                    className={cn('sidebar_link_style',
                        pathname === `/about` && "text-baseClr bg-white dark:bg-white")}>
                    <BadgeInfoIcon size={20} />
                    <span>About</span>
                </Link>
            </nav>

            <div className="flex_center flex-col gap-4 w-full mt-auto">
                <UserAvatar />
            </div>

            {/* Radial Gradient background Overlay */}
            <div className="absolute inset-0 bg-sidebarGradient dark:bg-sidebarGradientDark -z-10"></div>
        </header>
    )
}

export default Sidebar