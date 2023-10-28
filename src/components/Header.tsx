import React from 'react'
import Link from 'next/link'
import ThemeButton from './CustomUI/ThemeButton'
import Logo from '@/assets/Logo'

type Props = {
    altLogo?: boolean,
}

const Header = ({ altLogo = false }: Props) => {
    return (
        <header className='flex justify-between items-center z-10'>
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

            <nav
                className='flex items-center gap-8 text-[1.1em] drop-shadow-md'>
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