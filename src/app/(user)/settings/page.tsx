"use client"
import { useEffect, useState } from 'react'
import Image from 'next/image'
import useUserStore from '@/store/useUserStore'
import useModalStore from '@/store/useModalStore'
import { Button } from '@/components/ui/button'
import MobileHeader from '@/components/MobileHeader'

import { HandlePWAInstall, deferredPrompt } from '@/lib/pwa'
import { CircleLoader } from '@/components/CustomUI/Skeletons'
import { User2, CheckIcon, LogOutIcon, MonitorSmartphoneIcon, TimerResetIcon } from 'lucide-react'

const Settings = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { user, isAdmin } = useUserStore()
    const { onOpen } = useModalStore()

    useEffect(() => {
        if (!user?.avatarImg)
            setIsLoading(false)
    }, [user?.avatarImg])

    return (
        <section className='section_style'>
            <MobileHeader />
            <h1 className='text-[2em] font-medium'>Settings</h1>

            <div className="flex_center flex-col gap-4 mt-10">
                <div className="relative">
                    <div className="flex_center w-[125px] aspect-square rounded-full overflow-hidden">
                        <CircleLoader size='125px' className={isLoading ? 'block' : "hidden"} />
                        {user?.avatarImg ?
                            <Image
                                src={user?.avatarImg}
                                alt='User_Avatar'
                                width={125}
                                height={125}
                                onLoad={() => setIsLoading(false)}
                                loading='eager'
                                className={isLoading ? 'hidden' : "block object-cover"}
                            />
                            :
                            <div style={{ width: 125, height: 125 }} className={isLoading ? 'hidden' : "flex_center bg-slate-400 text-white aspect-square p-1.5 rounded-full"}>
                                <User2 className='w-full h-full p-4' />
                            </div>
                        }
                    </div>
                    <div className="absolute top-0 scale-[1.12] w-full h-full border-[3px] border-dashed border-primary rounded-full animate-border-spin"></div>
                </div>

                <div className="text-center">
                    <h2 className='font-medium text-[1.4em]'>{user?.username}</h2>
                    <span className="opacity-80">{user?.email}</span>
                </div>
            </div>

            <div className="flex flex-col gap-4 max-w-[600px] mx-auto mt-6">
                <div className="flex border-2 p-2 rounded">
                    <div className="border-r border-border/80 pl-1 w-fit min-w-[140px] sm:min-w-[200px]">Username</div>
                    <div className="w-full pl-8 overflow-hidden overflow-ellipsis">{user?.username}</div>
                </div>
                <div className="flex border-2 p-2 rounded">
                    <div className="border-r border-border/80 pl-1 w-fit min-w-[140px] sm:min-w-[200px] ">Email</div>
                    <div className="w-full pl-8 overflow-hidden overflow-ellipsis">{user?.email}</div>
                </div>
                <div className="flex border-2 p-2 rounded">
                    <div className="border-r border-border/80 pl-1 w-fit min-w-[140px] sm:min-w-[200px]">Role</div>
                    <div className="w-full pl-8">{isAdmin ? "Administrator" : user?.accessToken ? "Faculty" : "Student"}</div>
                </div>
                {!isAdmin && user?.accessToken && <div className="flex border-2 p-2 rounded">
                    <div className="border-r border-border/80 pl-1 w-fit min-w-[140px] sm:min-w-[200px]">Approval Status</div>
                    <div className="w-full pl-8">
                        {user?.isApproved ?
                            <div className='flex gap-2 text-green-600'>
                                <CheckIcon />
                                <span>Approved</span>
                            </div>
                            :
                            <div className='flex gap-2 text-yellow-500'>
                                <TimerResetIcon />
                                <span>Pending</span>
                            </div>
                        }
                    </div>
                </div>}

                <div className="flex gap-4">
                    {deferredPrompt && <Button
                        variant="outline"
                        onClick={HandlePWAInstall}
                        className='flex_center gap-2 w-full bg-gray-200 dark:bg-gray-500 hover:bg-gray-200'>
                        <MonitorSmartphoneIcon />
                        <span>Install PWA App</span>
                    </Button>}

                    <Button
                        variant="destructive"
                        onClick={() => onOpen("LogoutModal")}
                        style={{ margin: !deferredPrompt ? "2em auto" : "" }}
                        className='flex_center gap-2 w-full sm:max-w-[300px]'>
                        <LogOutIcon />
                        <span>Logout</span>
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default Settings