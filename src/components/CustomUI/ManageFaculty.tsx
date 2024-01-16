import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '../ui/button'
import toast from 'react-hot-toast'
import { Loader2Icon, MoreVerticalIcon, Trash2Icon, XIcon } from 'lucide-react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { deleteUser } from '@/app/actions/UserActions'

type Props = {
    facultyName: string,
    facultyUid: string,
}

const ManageFaculty = ({ facultyName, facultyUid }: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const compareText = (value: string) => {
        if (value === `Delete ${facultyName}`)
            setIsDisabled(false)
        else
            setIsDisabled(true)
    }

    const handleDeleteUser = async () => {
        setIsLoading(true)
        setIsDisabled(true)
        try {
            const res = await deleteUser(facultyUid)

            if (res?.status === 201) {
                toast.success(`Faculty deleted successfully!`)
                setOpen(false)
            }
        } catch (err) {
            console.log(err)
            toast.error(`Error while deleting Faculty`)
        } finally {
            await queryClient.invalidateQueries({ queryKey: ["facultyList"] })
            setIsLoading(false)
            setIsDisabled(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger className='hover:bg-primary/20 p-2 rounded-md'>
                    <MoreVerticalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='mr-7 border border-primary/50 bg-background/80 backdrop-blur'>
                    <DropdownMenuLabel>Manage Faculty</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <DialogTrigger className='flex_center gap-2 !text-red-600 cursor-pointer'>
                            <Trash2Icon size={18} />
                            <span>Delete Faculty</span>
                        </DialogTrigger>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent className='w-[90%] md:max-w-fit mx-auto rounded-md'>
                <DialogHeader>
                    <DialogTitle>Delete faculty <span className='text-red-600'>{facultyName}</span> ?</DialogTitle>
                    <DialogDescription>
                        Are you sure about that? <br />
                        This User will be permanently deleted from ARMS!
                    </DialogDescription>
                </DialogHeader>

                <label className="relative sm:min-w-[350px]">
                    <span className='text-[0.9em] bg-background/0 px-1'>
                        Type &quot; <span className='text-red-500'>Delete {facultyName}</span> &quot; to confirm.
                    </span>

                    <div className="flex items-center border border-muted-foreground sm:focus-within:border-primary rounded p-1 mt-3">
                        <input
                            type="text"
                            placeholder={`Delete ${facultyName}`}
                            required={true}
                            onChange={(e) => compareText(e.target.value)}
                            className='text-[0.9em] w-full bg-background/0 px-2 py-1 border-none outline-none placeholder:text-secondary-foreground/70' />
                    </div>
                </label>

                <DialogFooter className="flex-row gap-12 mt-4">
                    <DialogClose asChild>
                        <Button variant="secondary" className='flex_center gap-2 w-full'>
                            <XIcon size={20} />
                            <span>Cancel</span>
                        </Button>
                    </DialogClose>

                    <Button
                        variant="destructive"
                        onClick={handleDeleteUser}
                        disabled={isDisabled}
                        className='flex_center gap-2 w-full text-white deleteBtnBg'>
                        {isLoading ?
                            <>
                                <Loader2Icon size={20} className='animate-spin' />
                                <span>Deleting</span>
                            </>
                            :
                            <>
                                <Trash2Icon size={20} />
                                <span>Delete</span>
                            </>
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ManageFaculty