import Image from 'next/image'
import LoginForm from '@/components/Forms/LoginForm'
import Header from '@/components/Header'
import Trails from '@/components/Trails'
import { PeopleVector, UploadVector } from '@/assets/SVGs'

const Login = () => {
    return (
        <main className='flex flex-col w-full h-screen px-4 py-3 overflow-hidden scalingZoom'>
            <Header />

            <section className='h-full flex justify-evenly lg:justify-between items-center flex-col-reverse lg:flex-row px-8 2xl:px-4 my-auto'>
                <div className="hidden lg:flex_center flex-col gap-8">
                    <p className="text-[2.5em] 2xl:text-[3em] font-medium">
                        Let&apos;s get <span className="text-primary">Started</span>
                    </p>
                    <Image src={UploadVector} alt='UploadVector' className='w-[300px] 2xl:w-[450px]' priority={true} />
                </div>

                <LoginForm />

                <div className="flex_center flex-col-reverse sm:flex-col gap-8">
                    <Image src={PeopleVector} alt='PeopleVector' className='w-[250px] sm:w-[300px] 2xl:w-[450px]' priority={true} />
                    <p className="text-[2em] sm:text-[2.5em] 2xl:text-[3em] font-medium">
                        Login as <span className="text-primary">Faculty</span>
                    </p>
                </div>
            </section>

            <p className='flex_center sm:text-[1.2em] drop-shadow-md sm:text-white'>© Copyright 2023 ChiragChrg</p>

            <Trails rotate='90deg' yOffset='0%' leftBtn buttonClass='hidden lg:inline-flex' offsetDirection="center" className='hidden lg:block lg:h-[40%] 2xl:h-[80%]' />
        </main>
    )
}

export default Login