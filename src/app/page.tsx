"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LandingVector } from '@/assets'
import Header from '@/components/Header'
import Trails from '@/components/Trails'
import useUserStore from '@/store/useUserStore'

export default function Home() {
  const { setUser } = useUserStore()
  const router = useRouter()

  const HandleAnonymousLogin = () => {
    const formattedUser = {
      uid: "anonymous",
      username: "Student",
      email: "Anomymous User",
    }
    setUser(formattedUser)
    localStorage.setItem("arms-user", JSON.stringify(formattedUser));
    router.push("/dashboard")
  }

  return (
    <main className='relative px-4 py-3 w-full h-full overflow-hidden scalingZoom'>
      <Header altColor />

      <section className='w-full h-full min-h-[90vh] scalingHeight px-4 flex flex-col flex-1 justify-between'>
        <div className="flex flex-col gap-2">
          <h1 className='Landing_Title text-[2rem] 2xl:text-[3rem] font-medium'>
            <span>A</span>cademic <span>R</span>esource <span>M</span>anagement <span>S</span>ystem
          </h1>
          <p className='text-[1em] 2xl:text-[1.5em] p-1 mt-4 bg-background/20 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none rounded drop-shadow'>
            ARMS is an educational platform designed to empower students with easy access to study <br className='hidden sm:block' /> materials for their respective subjects. <br className='block sm:hidden' /> Students can conveniently browse and <br className='hidden sm:block' /> download PDF documents uploaded by authorized faculties.</p>
        </div>

        <div className="">
          <div className="flex justify-between items-end ">
            <Image src={LandingVector} alt='LandingVector' className='hidden sm:block w-[350px] 2xl:w-[500px]' />

            <div className="w-full sm:w-fit flex_center flex-col gap-8 bg-background/60 backdrop-blur rounded-md p-4 2xl:p-8 sm:mr-[17em] 2xl:mr-[25em]">
              <h2 className='text-[1.4em] font-medium drop-shadow'>Let&apos;s get started! 🚀</h2>
              <div className="flex_center gap-4 w-full sm:w-fit">
                <div
                  onClick={HandleAnonymousLogin}
                  className='flex_center flex-col rounded w-full sm:w-[10em] py-2 px-2 2xl:px-4 bg-background hover:text-white hover:bg-[var(--logoClr)] transition-colors cursor-pointer select-none'>
                  <h3 className='text-[1.1em]'>I&apos;m a Student</h3>
                  <p className='opacity-70 text-[0.9em]'>Anonymous</p>
                </div>

                <Link
                  href="/login"
                  className='flex_center flex-col rounded w-full sm:w-[10em] py-2 px-2 2xl:px-4 bg-background hover:text-white hover:bg-[var(--logoClr)] transition-colors cursor-pointer'>
                  <h3 className='text-[1.1em]'>I&apos;m a Faculty</h3>
                  <p className='opacity-70 text-[0.9em]'>Login / Signup</p>
                </Link>
              </div>
            </div>
          </div>

          <p className='flex_center sm:text-[1.2em] drop-shadow-md text-white mt-8'>© Copyright 2023 ChiragChrg</p>
        </div>
      </section>

      <Trails className='w-[400%] h-[46%] sm:w-[200%] sm:h-[85%] 2xl:h-[75%]' />
    </main>
  )
}
