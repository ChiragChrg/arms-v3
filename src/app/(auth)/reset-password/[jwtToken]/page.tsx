"use client"
import { FormEvent, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from "next/image"
import * as jose from "jose"
import axios from 'axios'
import toast from 'react-hot-toast'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import Input from '@/components/CustomUI/Input'
import { KeyRoundIcon, Loader2Icon } from 'lucide-react'
import { ResetPasswordVector } from '@/assets/SVGs'

const ResetPassword = () => {
    const [password, setPassword] = useState<string>("")
    const [confirmpassword, setConfirmPassword] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)

    const { jwtToken } = useParams()
    const router = useRouter()

    const decodedUrl = jose.decodeJwt(jwtToken as string)
    if (!decodedUrl?.uid || !decodedUrl?.username) {
        toast.error("Invalid Reset URL!")
        router.push("/")
    }

    const HandleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
        e?.preventDefault()

        // Exit function if passwords do not match
        if (password !== confirmpassword) {
            toast.error("Passwords do not match")
            return
        }

        const ResetToastID = toast.loading("Resetting Password...")
        setIsLoading(true)

        try {
            const res = await axios.post("/api/post/reset-password", {
                uid: decodedUrl?.uid,
                password
            })

            if (res?.status === 201) {
                toast.success("Password reset successful!", {
                    id: ResetToastID
                })

                router.push("../login")
            }
        } catch (err) {
            toast.error("Something went wrong!", {
                id: ResetToastID
            })
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className='relative flex flex-col px-4 py-3 w-full h-full min-h-screen overflow-hidden'>
            <Header disableAuthRedirect={true} />

            <section className='w-full h-full flex justify-between items-center flex-col px-3 2xl:px-4 my-auto sm:my-0 gap-12 pb-20 sm:pb-4'>
                <div className=" flex_center flex-col gap-8 mb-6 sm:mb-0 mt-4 sm:mt-0">
                    <h1 className='text-[1.6em] sm:text-[2.2em] font-bold text-center'>
                        Welcome
                        <span className="text-primary"> {decodedUrl?.username as string}</span>
                    </h1>
                    <Image src={ResetPasswordVector} alt='ResetPasswordVector' className='w-[80%] sm:w-[280px] 2xl:w-[350px]' priority={true} />
                </div>

                <form onSubmit={HandleResetPassword} className='flex flex-col gap-3 2xl:gap-4 md:max-w-min mx-auto'>
                    <Input
                        type='password'
                        label='New password'
                        placeholder='Enter new password'
                        className='2xl:w-[500px]'
                        setValue={setPassword} />
                    <Input
                        type='password'
                        label='Confirm new password'
                        placeholder='Retype new password'
                        className='2xl:w-[500px]'
                        setValue={setConfirmPassword} />

                    <Button type='submit' className='flex_center gap-4 text-white' disabled={isLoading}>
                        {isLoading ?
                            <Loader2Icon className='animate-spin' />
                            : <KeyRoundIcon />
                        }
                        RESET PASSWORD
                    </Button>
                </form>
            </section>
        </main>
    )
}

export default ResetPassword