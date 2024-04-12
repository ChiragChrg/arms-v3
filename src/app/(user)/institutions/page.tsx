"use client"
import { useQuery } from '@tanstack/react-query'
import { DataStoreTypes } from '@/types/dataStoreTypes'
import Link from 'next/link'
import MobileHeader from '@/components/MobileHeader'
import NavRoute from '@/components/NavRoutes'
import { RectLoader } from '@/components/CustomUI/Skeletons'
import { PlusIcon } from 'lucide-react'
import BuildingSVG from '@/assets/Icons/BuildingSVG'
import useUserStore from '@/store/useUserStore'
import { getAllInstitutions } from '@/app/actions/DocsActions'

const Institutions = () => {
    const { user } = useUserStore()

    const { data, isLoading } = useQuery({
        queryKey: ["getAllInstitution"],
        queryFn: async () => {
            try {
                const res = await getAllInstitutions();
                return res as DataStoreTypes[];
            } catch (error) {
                console.error('Error fetching institutions:', error);
                throw new Error('Failed to fetch institutions data');
            }
        }
    })

    return (
        <section className='section_style pb-4'>
            <NavRoute routes={["Institutions"]} />
            <MobileHeader />

            <div className="flex justify-between items-center mt-2">
                <h1 className='text-[2em] font-medium'>Institutions</h1>
                {user?.isApproved &&
                    <Link href="./institutions/create" className='flex_center gap-2 text-[1em] bg-primary text-white rounded-sm px-2 py-1.5'>
                        <PlusIcon />
                        <span>Create</span>
                        <span className='hidden sm:block'>Institution</span>
                    </Link>
                }
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.25em] w-full mt-4">
                {!isLoading ?
                    data?.map(obj => (
                        <Link
                            href={`./institutions/${obj?.instituteName?.toLowerCase().replaceAll(" ", "-")}`}
                            key={obj?._id}
                            className="flex_center flex-col w-full h-full rounded-md bg-radialGradient dark:bg-radialGradientDark p-2">
                            <div className="w-fit bg-primary/80 p-4 rounded-full mb-4 text-white">
                                <BuildingSVG size='40' />
                            </div>
                            <span className="text-[1.4em] font-medium">{obj?.instituteName}</span>
                            <p className="w-full min-h-[45px] text-center text-[0.925em] opacity-80">{obj?.description}</p>
                        </Link>
                    ))
                    :
                    <>
                        <RectLoader height='11em' radius={0.375} />
                        <RectLoader height='11em' radius={0.375} />
                        <RectLoader height='11em' radius={0.375} />
                        <RectLoader height='11em' radius={0.375} />
                        <RectLoader height='11em' radius={0.375} />
                        <RectLoader height='11em' radius={0.375} />
                    </>
                }
            </div>
        </section>
    )
}

export default Institutions