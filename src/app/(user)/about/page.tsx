import React from 'react'
import Logo from '@/assets/Icons/Logo'
import { CLogo, DiscordIcon, FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from '@/assets/SVGs';
import Image from 'next/image';
import MobileHeader from '@/components/MobileHeader';

const About = () => {
    const currentYear = new Date().getFullYear();

    return (
        <section className='flex flex-col justify-between gap-4 px-4 py-3 w-full h-full min-h-screen overflow-scroll'>
            <MobileHeader />

            <h1 className='text-[1em] md:text-[2em] font-medium'>About <span className="text-primary font-bold">ARMS</span></h1>

            <div className="relative flex_center w-full max-w-[240px] h-[240px] mx-auto my-10">
                <span className='absolute w-full aspect-square rounded-full bg-primary/80 opacity-0 animate-ripple'></span>
                <span className='absolute w-full aspect-square rounded-full bg-primary/80 opacity-0 animate-ripple delay-700'></span>
                <Logo stroke='hsl(222.2 84% 4.9%)' size='120' className='z-[1]' />
            </div>

            <p className='hidden md:block text-justify indent-16'>ARMS (Academic Resource Management System) is an all-inclusive educational platform designed to empower students with easy access to study materials for their respective subjects. By logging in anonymously, students can conveniently browse and download PDF documents uploaded by authorized faculties. With a centralized approach, ARMS ensures that students can effortlessly find and obtain the necessary resources they need for their academic pursuits. It&apos;s a user-friendly solution that streamlines the process of resource management, providing a seamless experience for both students and faculties alike.</p>

            <p className='md:hidden text-[0.85em] text-justify indent-14'>ARMS (Academic Resource Management System) is a platform that enables students to access study materials uploaded by faculty members. Students can anonymously log in to browse and download PDF documents. ARMS simplifies resource management for both students and faculty, ensuring easy access to academic materials.</p>

            <div className="w-full flex justify-center md:justify-end items-center gap-4 text-[0.85em]">
                Developed By -
                <a href="https://chiragchrg.netlify.app/"
                    target="_blank"
                    rel="noreferrer"
                    title='ChiragChrg | Portfolio'
                    className='flex gap-4 border border-secondary p-2 rounded hover:bg-primary/10 transition-colors'>
                    <Image src={CLogo} alt="LogoIcon" width={20} height={20} />
                    <span>ChiragChrg</span>
                </a>
            </div>

            <footer
                className="relative bottom-0 w-full flex justify-between items-center flex-col gap-8 px-4 py-6"
            >
                <div className="grid grid-cols-3 lg:grid-cols-6 gap-x-20 gap-y-8 lg:gap-20">
                    <a
                        href="https://www.facebook.com/ChiragChrg/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Image src={FacebookIcon} alt="FaceBook" width={25} height={25} />
                    </a>
                    <a href="https://x.com/ChrgChirag" target="_blank" rel="noreferrer">
                        <Image src={TwitterIcon} alt="Twitter X" width={25} height={25} />
                    </a>
                    <a
                        href="https://www.instagram.com/chiragchrg/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Image src={InstagramIcon} alt="Instagram" width={25} height={25} />
                    </a>
                    <a
                        href="https://in.linkedin.com/in/chiragchrg"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Image src={LinkedinIcon} alt="Discord" width={25} height={25} />
                    </a>
                    <a
                        href="https://github.com/ChiragChrg"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Image src={GithubIcon} alt="Discord" width={25} height={25} />
                    </a>
                    <a
                        href="https://discord.com/invite/8ngPa6tE"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Image src={DiscordIcon} alt="Discord" width={25} height={25} />
                    </a>
                </div>

                <span className='text-[0.9em]'>© Copyright 2023-{currentYear} ChiragChrg</span>
            </footer>
        </section>
    )
}

export default About