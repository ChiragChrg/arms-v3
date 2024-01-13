import { Button } from '@/components/ui/button'
import axios from 'axios'
import { CheckIcon, Loader, User2, X } from 'lucide-react'
import Image from 'next/image'
import { FacultyType } from './page'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

type Props = {
    user: FacultyType
}
type MutationType = {
    uid: string,
    approval: "approve" | "reject"
}

const UserCard = ({ user }: Props) => {
    const queryClient = useQueryClient()

    const HandleRequest = async ({ approval, uid }: MutationType) => {
        const res = await axios.post("/api/post/manage-approval", { approval, uid })
        return res
    }

    const { mutate, isPending } = useMutation({
        mutationFn: HandleRequest,
        onSuccess: async (data) => {
            if (data?.data?.isUserApproved) {
                toast.success("User Approved! 👍🏻")
            } else {
                toast.success("User Rejected! 🚫")
            }

            return await queryClient.invalidateQueries({ queryKey: ["facultyRequestList"] })
        },
    })

    return (
        <div className="flex_center flex-col gap-1 rounded-md py-4 bg-radialGradientDark dark:bg-radialGradientDark">
            {user?.avatarImg ?
                <Image
                    src={user?.avatarImg}
                    alt='User_Avatar'
                    width={80}
                    height={80}
                    loading='eager'
                    className='rounded-full'
                />
                :
                <div className="bg-slate-400 w-fit max-w-[80px] p-3 rounded-full text-white">
                    <User2 size={56} />
                </div>
            }

            <h3 className='mt-2'>{user?.username}</h3>
            <span className='text-[0.8em] opacity-80'>{user?.email}</span>

            <div className="flex_center gap-4 mt-2 w-full px-8">
                <Button
                    onClick={() => mutate({ approval: "approve", uid: user?._id })}
                    className='flex_center gap-1 p-2 min-w-[90px] w-full h-fit text-[0.8em] bg-green-600 hover:bg-green-700 text-white drop-shadow'>
                    {isPending ?
                        <Loader size={20} className='animate-spin' />
                        :
                        <CheckIcon size={20} />}
                    <span>Approve</span>
                </Button>

                <Button
                    variant="destructive"
                    onClick={() => mutate({ approval: "reject", uid: user?._id })}
                    className='flex_center deleteBtnBg gap-1 p-2 min-w-[90px] w-full h-fit text-[0.8em] text-white drop-shadow'>
                    {isPending ?
                        <Loader size={20} className='animate-spin' />
                        :
                        <X size={20} />
                    }
                    <span>Reject</span>
                </Button>
            </div>
        </div>
    )
}

export default UserCard