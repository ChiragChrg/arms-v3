import Logo from '@/assets/Icons/Logo'
import React from 'react'

const LoaderUI = () => {
    return (
        <div className="fixed inset-0 z-[999] flex_center flex-col gap-4 bg-background">
            <h1 className="text-[2em] whitespace-nowrap sm:text-[2.5em] 2xl:text-[3em] font-medium">
                Welcome to <span className="text-primary font-bold">ARMS</span>
            </h1>

            <div className="relative flex_center w-full max-w-[400px] h-[400px]">
                <span className='absolute w-full aspect-square rounded-full bg-primary/80 opacity-0 animate-ripple'></span>
                <span className='absolute w-full aspect-square rounded-full bg-primary/80 opacity-0 animate-ripple delay-700'></span>
                <Logo stroke='hsl(222.2 84% 4.9%)' size='200' className='z-10' />
            </div>

            <p className='text-[1.2em] tracking-widest'>Loading...</p>
        </div>
    )
}

export default LoaderUI