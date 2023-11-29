import React from 'react'
import Header from '@/components/Header'
import Logo from '@/assets/Logo'

const About = () => {
    return (
        <main className='relative flex flex-col px-4 py-3 w-full h-full min-h-screen overflow-hidden'>
            <Header disableAuthRedirect={true} />

            <section className='w-full h-full flex justify-between items-center flex-col px-3 2xl:px-4'>
                <div className="relative flex_center w-full max-w-[240px] h-[240px]">
                    <span className='absolute w-full aspect-square rounded-full bg-primary/80 opacity-0 animate-ripple'></span>
                    <span className='absolute w-full aspect-square rounded-full bg-primary/80 opacity-0 animate-ripple delay-700'></span>
                    <Logo stroke='hsl(222.2 84% 4.9%)' size='120' className='z-10' />
                </div>

                <div className="w-full md:max-w-[1080px]">
                    <h1 className='text-[2em] font-medium'>About <span className="text-primary font-bold">ARMS</span></h1>

                    <p className='text-justify indent-14 sm:indent-16 mt-2'>ARMS (Academic Resource Management System) is an all-inclusive educational platform designed to empower students with easy access to study materials for their respective subjects. By logging in anonymously, students can conveniently browse and download PDF documents uploaded by authorized faculties. With a centralized approach, ARMS ensures that students can effortlessly find and obtain the necessary resources they need for their academic pursuits. It&apos;s a user-friendly solution that streamlines the process of resource management, providing a seamless experience for both students and faculties alike.</p>
                </div>
            </section>
        </main>
    )
}

export default About