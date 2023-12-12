"use client"
import { FormEvent, useState } from 'react'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import NavRoute from '@/components/NavRoutes'
import MobileHeader from '@/components/MobileHeader'
import { Button } from '@/components/ui/button'
import useUserStore from '@/store/useUserStore'
import { NewInstituteVector } from '@/assets'
import BuildingSVG from '@/assets/BuildingSVG'
import { Loader2Icon, PlusIcon, User2Icon } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

const CreateInstitute = () => {
    const [instituteName, setInstituteName] = useState<string>("")
    const [instituteDesc, setInstituteDesc] = useState<string>("")
    const { user } = useUserStore()
    const router = useRouter()

    const HandleCreateInstitute = async (e: FormEvent<HTMLFormElement>) => {
        e?.preventDefault()
        const res = await axios.post("/api/post/createinstitute", {
            instituteName,
            instituteDesc,
            registeredBy: user?.uid
        })
        return res
    }

    const { mutate, isPending } = useMutation({
        mutationFn: HandleCreateInstitute,
        onSuccess: async () => {
            toast.success("Institution Created Successfully!")
            router.push("../institutions")
        },
        onError(error) {
            console.log(error)
            toast.error(`Error: ${error?.message || "Something went wrong!"}`)
        }
    })

    return (
        <section className='section_style'>
            <NavRoute routes={["Institutions", "Institutions/Create"]} />
            <MobileHeader />

            <h1 className="text-[1.8em] sm:text-[2em] 2xl:text-[3em] font-medium my-2 text-center">
                Create new <span className="text-primary">Institution</span>
            </h1>

            <div className="flex justify-around items-center flex-col-reverse sm:flex-row gap-6 mt-14">
                <form onSubmit={(e) => mutate(e)} className='flex flex-col gap-3 2xl:gap-4'>
                    <label className="relative min-w-[350px]">
                        <span className='text-[0.9em] bg-background/0 px-1'>Institute Name</span>

                        <div className="flex items-center border border-muted-foreground sm:focus-within:border-primary rounded p-1">
                            <input
                                type="text"
                                required={true}
                                placeholder='Enter Institute Name'
                                onChange={(e) => setInstituteName(e.target.value)}
                                className='text-[1em] w-full bg-background/0 px-2 py-1 border-none outline-none placeholder:text-secondary-foreground/70' />

                            <BuildingSVG size="24" className="absolute right-2 text-slate-400" />
                        </div>
                    </label>

                    <label className="relative min-w-[350px]">
                        <span className='text-[0.9em] bg-background/0 px-1'>Description</span>

                        <div className="flex flex-col border border-muted-foreground sm:focus-within:border-primary rounded p-1">
                            <textarea
                                rows={3}
                                maxLength={80}
                                placeholder='Enter Institute Description'
                                onChange={(e) => setInstituteDesc(e?.target?.value)}
                                className='resize-none text-[1em] w-full bg-background/0 px-2 py-1 border-none outline-none placeholder:text-secondary-foreground/70' />

                            <p className='w-full text-right text-[0.8em] text-slate-400 px-1'>{instituteDesc.length}/80</p>
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

                    <Button type='submit' className='flex_center gap-4 text-white' disabled={isPending}>
                        {isPending ?
                            <Loader2Icon className='animate-spin' />
                            : <PlusIcon />
                        }
                        Create Institute
                    </Button>
                </form>

                <Image src={NewInstituteVector} alt='NewInstituteVector' className='w-[280px] sm:w-[400px] 2xl:w-[550px]' />
            </div>
        </section>
    )
}

export default CreateInstitute