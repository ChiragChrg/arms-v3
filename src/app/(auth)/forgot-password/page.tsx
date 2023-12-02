"use client"
import { FormEvent, useState } from 'react'
import Image from "next/image"
import Header from '@/components/Header'
import { ForgotPasswordVector } from '@/assets'
import Input from '@/components/CustomUI/Input'
import { Button } from '@/components/ui/button'
import { KeyRoundIcon } from 'lucide-react'
import axios from 'axios'

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("")

    const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const res = await axios.post("/api/forgot-password", { email })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className='relative flex flex-col px-4 py-3 w-full h-full min-h-screen overflow-hidden'>
            <Header disableAuthRedirect={true} />

            <section className='w-full h-full flex justify-between items-center flex-col px-3 2xl:px-4 my-auto gap-12 pb-20'>
                <div className=" flex_center flex-col gap-8 mb-6 sm:mb-12 mt-4 sm:mt-0">
                    <p className="text-[2em] whitespace-nowrap sm:text-[2.5em] 2xl:text-[2.5em] font-medium">
                        Forgot <span className="text-primary">Password</span> ?
                    </p>
                    <Image src={ForgotPasswordVector} alt='ForgotPasswordVector' className='w-[280px] sm:w-[320px] 2xl:w-[400px]' priority={true} />
                </div>

                <form onSubmit={HandleSubmit} className='flex items-end gap-4'>
                    <Input
                        type='email'
                        label='Email'
                        placeholder='example@gmail.com'
                        className='block w-full 2xl:w-[600px]'
                        setValue={setEmail} />

                    <Button type='submit' className='gap-2 text-white'>
                        <KeyRoundIcon />
                        <span>Reset Password</span>
                    </Button>
                </form>
            </section>
        </main>
    )
}

export default ForgotPassword