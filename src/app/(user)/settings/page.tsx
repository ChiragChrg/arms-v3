"use client"
import Image from 'next/image'
import useUserStore from '@/store/useUserStore'
import { User2, CheckIcon, RotateCcwIcon, LogOutIcon, MonitorSmartphoneIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useModalStore from '@/store/useModalStore'
import { HandlePWAInstall } from '@/lib/pwa'
import { deferredPrompt } from '@/lib/pwa'

const Settings = () => {
    const { user, isAdmin } = useUserStore()
    const { onOpen } = useModalStore()

    return (
        <section className='section_style'>
            <h1 className='text-[2em] font-medium'>Settings</h1>

            <div className="flex_center flex-col gap-4 mt-10">
                <div className="relative">
                    {user?.avatarImg ?
                        <Image
                            src={user?.avatarImg}
                            alt='User_Avatar'
                            width={125}
                            height={125}
                            loading='eager'
                            className="block object-cover rounded-full"
                        />
                        :
                        <div className="block bg-slate-400 text-white w-[125px] aspect-square p-4 rounded-full">
                            <User2 className='w-full h-full' />
                        </div>
                    }
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
                                <RotateCcwIcon />
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