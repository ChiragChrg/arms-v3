"use client"
import { FormEvent, useState } from 'react'
import Image from "next/image"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import NavRoute from '@/components/NavRoutes'
import MobileHeader from '@/components/MobileHeader'
import { Button } from '@/components/ui/button'
import useUserStore from '@/store/useUserStore'
import { NewUnitVector } from '@/assets/SVGs'
import { BookOpenTextIcon, Loader2Icon, PlusIcon, User2Icon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

type Params = {
    instituteID: string,
    courseID: string,
    subjectID: string,
}

const CreateUnit = () => {
    const [unitName, setUnitName] = useState<string>("")
    const [unitDesc, setUnitDesc] = useState<string>("")
    const [isInvalid, setIsInvalid] = useState<boolean>(false)
    const { user } = useUserStore()
    const params = useParams<Params>()
    const router = useRouter()
    const queryClient = useQueryClient()

    const HandleCreateCourse = async (e: FormEvent<HTMLFormElement>) => {
        e?.preventDefault()
        const instituteName = params?.instituteID.replaceAll("-", " ");
        const courseName = params?.courseID.replaceAll("-", " ");
        const subjectName = params?.subjectID.replaceAll("-", " ");

        if (subjectName.toLowerCase() === unitName.toLowerCase())
            throw new Error("Unit name cannot be same as Subject name!")

        const res = await axios.post("/api/post/create-unit", {
            instituteName,
            courseName,
            subjectName,
            unitName,
            unitDesc,
            registeredBy: user?.uid
        })
        return res
    }

    const { mutate, isPending } = useMutation({
        mutationFn: HandleCreateCourse,
        onError(error) {
            console.log(error)
            toast.error(`Error: ${error?.message || "Something went wrong!"}`)
        },
        onSuccess: async () => {
            toast.success("Unit Created Successfully!")
            await queryClient.invalidateQueries()
            router.push(`/institutions/${params?.instituteID}/${params?.courseID}/${params?.subjectID}`)
        }
    })

    // Check if unitName matches the regex pattern
    const handleChange = (event: { target: { value: any } }) => {
        const { value } = event?.target;

        if (/^[a-zA-Z0-9\s]*$/.test(value)) {
            setIsInvalid(false)
            setUnitName(value.trim());
        } else {
            setIsInvalid(true)
        }
    };

    return (
        <section className='section_style'>
            <NavRoute routes={[
                "Institutions",
                `Institutions/${params?.instituteID}`,
                `Institutions/${params?.instituteID}/${params?.courseID}`,
                `Institutions/${params?.instituteID}/${params?.courseID}/${params?.subjectID}`,
                `Institutions/${params?.instituteID}/${params?.courseID}/${params?.subjectID}/Create`
            ]} />
            <MobileHeader />

            <h1 className="text-[1.8em] sm:text-[2em] 2xl:text-[3em] font-medium my-2 text-center">
                Create new <span className="text-primary">Unit</span>
            </h1>

            <div className="flex justify-around items-center flex-col-reverse lg:flex-row gap-6 mt-24">
                <form onSubmit={(e) => mutate(e)} className='flex flex-col gap-3 2xl:gap-4'>
                    <label className="relative min-w-[350px]">
                        <span className='text-[0.9em] bg-background/0 px-1'>Unit Name</span>

                        <div
                            style={isInvalid ? { borderColor: "rgb(239 68 68)" } : {}}
                            className="flex items-center border border-muted-foreground sm:focus-within:border-primary rounded p-1">
                            <input
                                type="text"
                                required={true}
                                placeholder='Enter Unit Name'
                                onChange={handleChange}
                                className='text-[1em] w-full bg-background/0 px-2 py-1 border-none outline-none placeholder:text-secondary-foreground/70' />

                            <BookOpenTextIcon size="24" className="absolute right-2 text-slate-400" />
                        </div>

                        <span
                            className='text-[0.8em] ml-1 text-red-500'
                            style={{ visibility: isInvalid ? "visible" : "hidden" }}>
                            Cannot contain special characters
                        </span>
                    </label>

                    <label className="relative min-w-[350px]">
                        <span className='text-[0.9em] bg-background/0 px-1'>Description</span>

                        <div className="flex flex-col border border-muted-foreground sm:focus-within:border-primary rounded p-1">
                            <textarea
                                rows={2}
                                placeholder='Enter Unit Description'
                                onChange={(e) => setUnitDesc(e?.target?.value)}
                                maxLength={40}
                                required={true}
                                className='resize-none text-[1em] w-full bg-background/0 px-2 py-1 border-none outline-none placeholder:text-secondary-foreground/70' />

                            <p className='w-full text-right text-[0.8em] text-slate-400 px-1'>{unitDesc.length}/40</p>
                        </div>
                    </label>

                    <label className="relative min-w-[350px]">
                        <span className='text-[0.9em] bg-background/0 px-1'>Creator</span>

                        <div className="flex items-center border border-muted-foreground sm:focus-within:border-primary rounded p-1">
                            <input
                                type="text"
                                required={true}
                                defaultValue={user?.username || ""}
                                disabled={true}
                                className='text-[1em] w-full bg-background/0 text-slate-400 px-2 py-1 border-none outline-none placeholder:text-secondary-foreground/70' />

                            <User2Icon size={24} className="absolute right-2 text-slate-400" />
                        </div>
                    </label>

                    <Button type='submit' className='flex_center gap-4 text-white' disabled={isPending || isInvalid}>
                        {isPending ?
                            <Loader2Icon className='animate-spin' />
                            : <PlusIcon />
                        }
                        Create Unit
                    </Button>
                </form>

                <Image src={NewUnitVector} alt='NewCourseVector' className='w-[280px] sm:w-[400px] 2xl:w-[550px]' />
            </div>
        </section>
    )
}

export default CreateUnit