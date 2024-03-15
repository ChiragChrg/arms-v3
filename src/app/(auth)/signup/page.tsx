import Image from 'next/image'
import SignupForm from '@/components/Forms/SignupForm'
import Header from '@/components/Header'
import Trails from '@/components/Trails'
import { SignupVector } from '@/assets/SVGs'

const Signup = () => {
    return (
        <main className='flex flex-col w-full h-screen px-4 py-3 overflow-hidden scalingZoom'>
            {/* Show colored Logo on mobile devies & vice versa */}
            <Header altLogo className='hidden lg:flex' />
            <Header className='lg:hidden' />

            <section className='h-full flex justify-between items-center flex-col-reverse lg:flex-row px-8 2xl:px-8'>
                <SignupForm />

                <div className=" flex_center flex-col gap-8 mb-6 sm:mb-12 mt-4 sm:mt-0">
                    <p className="text-[2em] whitespace-nowrap sm:text-[2.5em] 2xl:text-[3em] font-medium">
                        Welcome new <span className="text-primary">Faculty</span>
                    </p>
                    <Image src={SignupVector} alt='SignupVector' className='w-[280px] sm:w-[400px] 2xl:w-[550px]' priority={true} />
                </div>
            </section>

            <p className='flex_center sm:text-[1.2em] drop-shadow-md sm:text-white'>© Copyright 2023 ChiragChrg</p>

            <Trails className='hidden lg:inline-flex lg:h-[55%] 2xl:h-[80%]' offsetDirection='right' buttonClass='hidden lg:inline-flex' rotate='45deg' leftBtn />
        </main>
    )
}

export default Signup