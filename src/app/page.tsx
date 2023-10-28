import { LandingVector } from '@/assets'
import Header from '@/components/Header'
import Trails from '@/components/Trails'
import Image from 'next/image'

export default function Home() {
  return (
    <main className='relative flex flex-col px-4 py-3 w-full h-full min-h-screen overflow-hidden'>
      <Header />

      <section className='flex flex-col flex-1 justify-between w-full h-max p-4'>
        <div className="flex flex-col gap-2">
          <h1 className='Landing_Title text-[2rem] 2xl:text-[3rem] font-medium'>
            <span>A</span>cademic <span>R</span>esource <span>M</span>anagement <span>S</span>ystem
          </h1>
          <p className='text-[1em] 2xl:text-[1.5em]'>
            ARMS is an open-source software developed for students. <br />
            Students can easily find and download the study materials uploaded by the college faculty.</p>

        </div>

        <div className="flex justify-between items-end mt-[5em] 2xl:mt-[10em]">
          <Image src={LandingVector} alt='LandingVector' className='w-[350px] 2xl:w-[500px]' />

          <div className="flex_center flex-col gap-8 bg-background rounded-lg p-4 2xl:p-8 mr-[10em] 2xl:mr-[25em]">
            <h2 className='text-[1.4em]'>Lets get started! 🚀</h2>
            <div className="flex_center gap-4">
              <div className='flex_center flex-col rounded-lg w-[10em] py-2 px-2 2xl:px-4 hover:text-white hover:bg-[var(--logoClr)] border border-primary transition-colors cursor-pointer'>
                <h3 className='text-[1.1em]'>I&apos;m a Student</h3>
                <p className='opacity-70 text-[0.9em]'>Anonymous</p>
              </div>

              <div className='flex_center flex-col rounded-lg w-[10em] py-2 px-2 2xl:px-4 hover:text-white hover:bg-[var(--logoClr)] border border-primary transition-colors cursor-pointer'>
                <h3 className='text-[1.1em]'>I&apos;m a Faculty</h3>
                <p className='opacity-70 text-[0.9em]'>Login / Signup</p>
              </div>
            </div>
          </div>
        </div>

        <p className='flex_center text-[1.2em] drop-shadow-md text-white'>© Copyright 2023 ChiragChrg</p>
      </section>


      <Trails />
      {/* <Trails rotate='45deg' xOffset='210%' topOffset='-100%' leftBtn /> */}
    </main>
  )
}
