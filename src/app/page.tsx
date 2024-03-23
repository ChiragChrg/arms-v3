import Image from 'next/image'
import Link from 'next/link'
import { LandingVector } from '@/assets/SVGs'
import Header from '@/components/Header'
import Trails from '@/components/Trails'
import AnonymousButton from '@/components/CustomUI/AnonymousButton'

export default function Home() {
  return (
    <main className='flex flex-col w-full h-screen px-4 py-3 overflow-hidden scalingZoom'>
      <Header altColor />

      <section className='h-full px-4 flex flex-col justify-between'>
        <div className="flex flex-col gap-2">
          <h1 className='Landing_Title lg:flex gap-8 text-[2rem] 2xl:text-[3rem] font-medium'>
            <p>
              <span>A</span>cademic
            </p>
            <p>
              <span>R</span>esource
            </p>
            <p>
              <span>M</span>anagement
            </p>
            <p>
              <span>S</span>ystem
            </p>
          </h1>
          <p className='text-[1em] 2xl:text-[1.5em] p-1 mt-4 bg-background/20 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none rounded drop-shadow'>
            ARMS is an educational platform designed to empower students with easy access to study <br className='hidden sm:block' /> materials for their respective subjects. <br className='block sm:hidden' /> Students can conveniently browse and <br className='hidden sm:block' /> download PDF documents uploaded by authorized faculties.</p>
        </div>

        <div className='h-full flex flex-col justify-end gap-4 pb-4'>
          <div className="flex justify-between items-center mb-12">
            <Image
              src={LandingVector}
              alt='LandingVector'
              loading='eager'
              className='hidden sm:block w-[350px] 2xl:w-[500px]' />

            <div className="w-full sm:w-fit flex_center flex-col gap-8 bg-background/60 backdrop-blur-lg rounded-md p-4 2xl:p-8 sm:mr-[17em] 2xl:mr-[25em]">
              <h2 className='text-[1.4em] font-medium drop-shadow'>Let&apos;s get started! 🚀</h2>
              <div className="flex_center gap-4 w-full sm:w-fit">
                <AnonymousButton />

                <Link
                  href="/login"
                  className='flex_center flex-col rounded w-full sm:w-[10em] py-2 px-2 2xl:px-4 bg-background hover:text-white hover:bg-[var(--logoClr)] transition-colors cursor-pointer'>
                  <h3 className='text-[1.1em]'>I&apos;m a Faculty</h3>
                  <p className='opacity-70 text-[0.9em]'>Login / Signup</p>
                </Link>
              </div>
            </div>
          </div>

          <p className='flex_center sm:text-[1.2em] drop-shadow-md text-white'>© Copyright 2023 ChiragChrg</p>
        </div>
      </section>

      <Trails className='w-[400%] sm:w-[200%] h-[46%] sm:h-[50%] md:h-[55%] 2xl:h-[75%]' />
    </main>
  )
}