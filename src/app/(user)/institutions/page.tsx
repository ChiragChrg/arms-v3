"use client"
import { useState, useEffect } from 'react'
import axios from 'axios'
import useDataStore from '@/store/useDataStore'
import { RectLoader } from '@/components/CustomUI/Skeletons'
import BuildingSVG from '@/assets/BuildingSVG'
import NavRoute from '@/components/NavRoutes'
import { Menu } from 'lucide-react'
import useSidebarStore from '@/store/useSidebarStore'

const Institutions = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { data, setData } = useDataStore()
    const { setShowSidebar } = useSidebarStore()

    useEffect(() => {
        const GetInstitutions = async () => {
            try {
                const res = await axios.get('/api/institutions')
                if (res.status === 200) {
                    // console.log(res.data)
                    setData(res?.data)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }
        GetInstitutions()
    }, [setData])

    return (
        <section className='w-full h-full overflow-y-auto pb-4'>
            <NavRoute routes={["Institutions"]} className='hidden sm:flex' />

            <div className="flex sm:hidden justify-between items-center px-2 mb-1">
                <Menu size={40} className='sm:hidden text-logoClr dark:text-white' onClick={() => setShowSidebar(true)} />
            </div>

            <h1 className='text-[2em] font-medium px-2'>Institutions</h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1.25em] w-full mt-4 px-2">
                {!isLoading ?
                    data?.map(obj => (
                        <div key={obj?._id} className="flex_center flex-col w-full h-full rounded-md bg-primary/20 p-2 sm:hover:translate-y-[-0.5em] transition-transform">
                            <div className="w-fit bg-primary/80 p-4 rounded-full mb-4 text-white">
                                <BuildingSVG size='40' />
                            </div>
                            <span className="text-[1.4em] font-medium">{obj?.collegeName}</span>
                            <p className="w-full min-h-[45px] text-center text-[0.925em] opacity-80">{obj?.description}</p>
                        </div>
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