import React from 'react'
import { Logo } from '@/assets'
import Image from 'next/image'
import Link from 'next/link'
import ThemeButton from './Buttons/ThemeButton'

const Header = () => {
    return (
        <header className='flex justify-between items-center'>
            <div className="flex_center gap-3 text-[var(--logoClr)]">
                <Image src={Logo} alt='ARMS_Logo' width={40} height={40} />
                <p className='text-[2em] font-bold leading-8'>ARMS</p>
            </div>

            <nav className='flex items-center gap-8 text-[1.1em]'>
                <Link href="/">Home</Link>
                <Link href="https://chiragchrg.netlify.app/" target='_blank'>Portfolio</Link>
                <Link href="https://github.com/ChiragChrg" target='_blank'>GitHub</Link>

                <ThemeButton />
            </nav>
        </header>
    )
}

export default Header