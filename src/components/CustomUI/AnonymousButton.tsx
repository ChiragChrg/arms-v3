"use client"
import useUserStore from '@/store/useUserStore'
import { useRouter } from 'next/navigation'

const AnonymousButton = () => {
    const { setUser } = useUserStore()
    const router = useRouter()

    const HandleAnonymousLogin = () => {
        const formattedUser = {
            uid: "anonymous",
            username: "Student",
            email: "Anomymous User",
            avatarImg: "",
            isApproved: false,
            accessToken: "",
        }
        setUser(formattedUser)
        router.push("/dashboard")
    }

    return (
        <button
            onClick={HandleAnonymousLogin}
            className='flex_center flex-col rounded w-full sm:w-[10em] py-2 px-2 2xl:px-4 bg-background hover:text-white hover:bg-[var(--logoClr)] transition-colors cursor-pointer select-none'>
            <h3 className='text-[1.1em]'>I&apos;m a Student</h3>
            <p className='opacity-70 text-[0.9em]'>Anonymous</p>
        </button>
    )
}

export default AnonymousButton