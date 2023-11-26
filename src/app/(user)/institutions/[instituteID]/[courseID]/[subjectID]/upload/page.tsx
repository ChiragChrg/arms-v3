"use client"
import { useState } from 'react'
import Image from "next/image"
import NavRoute from '@/components/NavRoutes'
import MobileHeader from '@/components/MobileHeader'
import { Button } from '@/components/ui/button'
import useUserStore from '@/store/useUserStore'
import { NewCourseVector } from '@/assets'
import { Loader2Icon, PlusIcon, User2Icon } from 'lucide-react'
import { useParams } from 'next/navigation'
import OpenBookSVG from '@/assets/OpenBookSVG'
import BuildingSVG from '@/assets/BuildingSVG'
import BookStackSVG from '@/assets/BookStackSVG'

type Params = {
    instituteID: string,
    courseID: string,
    subjectID: string
}

const UploadDocuments = () => {
    const [instituteName, setInstituteName] = useState<string>("")
    const [instituteDesc, setInstituteDesc] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { user } = useUserStore()
    const params = useParams<Params>()

    return (
        <section className='section_style'>
            <NavRoute routes={[
                "Institutions",
                `Institutions/${params?.instituteID}`,
                `Institutions/${params?.instituteID}/${params?.courseID}`,
                `Institutions/${params?.instituteID}/${params?.courseID}/${params?.subjectID}`,
                `Institutions/${params?.instituteID}/${params?.courseID}/Create`
            ]} />
            <MobileHeader />

            <h1 className="text-[1.8em] sm:text-[2em] 2xl:text-[3em] font-medium my-2">
                Upload new <span className="text-primary">Documents</span>
            </h1>

            <div className='flex flex-col sm:flex-row gap-3 2xl:gap-4 w-full sm:px-8 mt-6'>
                <label className="relative w-full">
                    <span className='text-[0.9em] bg-background/0 px-1'>Institution</span>

                    <div className="flex items-center border border-muted-foreground sm:focus-within:border-primary rounded p-1">
                        <input
                            type="text"
                            required={true}
                            defaultValue={params?.instituteID || ""}
                            disabled={true}
                            className='text-[1em] w-full bg-background/0 text-slate-400 px-2 capitalize py-1 border-none outline-none placeholder:text-secondary-foreground/70' />

                        <BuildingSVG size="24" className="absolute right-2 text-slate-400" />
                    </div>
                </label>
                <label className="relative w-full">
                    <span className='text-[0.9em] bg-background/0 px-1'>Course</span>

                    <div className="flex items-center border border-muted-foreground sm:focus-within:border-primary rounded p-1">
                        <input
                            type="text"
                            required={true}
                            defaultValue={params?.courseID || ""}
                            disabled={true}
                            className='text-[1em] w-full bg-background/0 text-slate-400 px-2 capitalize py-1 border-none outline-none placeholder:text-secondary-foreground/70' />

                        <BookStackSVG size="24" className="absolute right-2 text-slate-400" />
                    </div>
                </label>
                <label className="relative w-full">
                    <span className='text-[0.9em] bg-background/0 px-1'>Subject</span>

                    <div className="flex items-center border border-muted-foreground sm:focus-within:border-primary rounded p-1">
                        <input
                            type="text"
                            required={true}
                            defaultValue={params?.subjectID || ""}
                            disabled={true}
                            className='text-[1em] w-full bg-background/0 text-slate-400 px-2 capitalize py-1 border-none outline-none placeholder:text-secondary-foreground/70' />

                        <OpenBookSVG size="24" className="absolute right-2 text-slate-400" />
                    </div>
                </label>
                <label className="relative w-full">
                    <span className='text-[0.9em] bg-background/0 px-1'>Uploader</span>

                    <div className="flex items-center border border-muted-foreground sm:focus-within:border-primary rounded p-1">
                        <input
                            type="text"
                            required={true}
                            defaultValue={user?.username || ""}
                            disabled={true}
                            className='text-[1em] w-full bg-background/0 text-slate-400 px-2 capitalize py-1 border-none outline-none placeholder:text-secondary-foreground/70' />

                        <User2Icon size={24} className="absolute right-2 text-slate-400" />
                    </div>
                </label>
            </div>
        </section>
    )
}

export default UploadDocuments