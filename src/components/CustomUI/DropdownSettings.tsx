"use client"
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'
import { Settings2Icon, User2, Trash2Icon, XIcon, Loader2Icon } from 'lucide-react'

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

type Props = {
    title: string,
    toDeleteName: string,
    isAuthorized: boolean,
    userID: string
}

type Params = {
    instituteID: string,
    courseID: string,
    subjectID: string
}

type RecentDataType = {
    [key: string]: {
        url: string,
        title: string,
        subtitle: string
    }[]
}

const DropdownSettings = ({ title, toDeleteName, isAuthorized, userID }: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const params = useParams<Params>()
    const router = useRouter()

    const compareText = (value: string) => {
        if (value === `Delete ${toDeleteName}`)
            setIsDisabled(false)
        else
            setIsDisabled(true)
    }

    const deleteRecentTopics = async () => {
        const recentDataUsers: RecentDataType = JSON.parse(localStorage.getItem("arms-recents") as string) || []
        const recentData = recentDataUsers[userID]

        const filteredData = recentData?.filter((obj) => {
            const topic = obj.url.split("/"); //split url to compare each text with toDeleteName
            return !topic.includes(toDeleteName?.replaceAll(" ", "-").toLowerCase());
        }); // return only the topics which dont include the toDeleteName value

        recentDataUsers[userID] = filteredData
        localStorage.setItem("arms-recents", JSON.stringify(recentDataUsers))
    }

    const handleDelete = async () => {
        setIsLoading(true)
        setIsDisabled(true)
        try {
            if (title === "Institute") {
                const res = await axios.delete('/api/delete/institute', {
                    data: {
                        instituteName: params?.instituteID.replaceAll("-", " ").toLowerCase(),
                    }
                });

                if (res?.status === 200) {
                    await deleteRecentTopics()
                    toast.success(`${title} deleted successfully!`)
                    setOpen(false)
                    router.push(`/institutions`)
                }
            } else if (title === "Course") {
                const res = await axios.delete('/api/delete/course', {
                    data: {
                        instituteName: params?.instituteID.replaceAll("-", " ").toLowerCase(),
                        courseName: params?.courseID.replaceAll("-", " ").toLowerCase(),
                    }
                });

                if (res?.status === 200) {
                    await deleteRecentTopics()
                    toast.success(`${title} deleted successfully!`)
                    setOpen(false)
                    router.push(`/institutions/${params?.instituteID}`)
                }
            } else if (title === "Subject") {
                const res = await axios.delete('/api/delete/subject', {
                    data: {
                        instituteName: params?.instituteID.replaceAll("-", " ").toLowerCase(),
                        courseName: params?.courseID.replaceAll("-", " ").toLowerCase(),
                        subjectName: params?.subjectID.replaceAll("-", " ").toLowerCase(),
                    }
                });

                if (res?.status === 200) {
                    await deleteRecentTopics()
                    toast.success(`${title} deleted successfully!`)
                    setOpen(false)
                    router.push(`/institutions/${params?.instituteID}/${params?.courseID}`)
                }
            }
        }
        catch (err) {
            console.log(err)
            toast.error(`Error while deleting ${title}`)
        } finally {
            setIsLoading(false)
            setIsDisabled(false)
        }
    }

    return (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
            <Dialog open={open} onOpenChange={setOpen}>
                <DropdownMenu>
                    <DropdownMenuTrigger className='bg-background/80 p-2 rounded-md'>
                        <Settings2Icon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='mr-7 border border-primary/50 bg-background/80 backdrop-blur'>
                        <DropdownMenuLabel>Manage {title}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='flex_center gap-2 cursor-pointer'>
                            <User2 size={18} />
                            <span>Creator Profile</span>
                        </DropdownMenuItem>
                        {(isAuthorized) &&
                            <DropdownMenuItem>
                                <DialogTrigger className='flex_center gap-2 !text-red-600 cursor-pointer'>
                                    <Trash2Icon size={18} />
                                    <span>Delete {title}</span>
                                </DialogTrigger>
                            </DropdownMenuItem>
                        }
                    </DropdownMenuContent>
                </DropdownMenu>

                <DialogContent className='w-[90%] md:max-w-fit mx-auto rounded-md'>
                    <DialogHeader>
                        <DialogTitle>Delete {title} <span className='text-red-600'>{toDeleteName}</span> ?</DialogTitle>
                        <DialogDescription>
                            Are you sure about that? <br />
                            This will permanently delete the {title} and all of its contents.
                        </DialogDescription>
                    </DialogHeader>

                    <label className="relative min-w-[350px]">
                        <span className='text-[0.9em] bg-background/0 px-1'>
                            Type &quot; <span className='text-red-500'>Delete {toDeleteName}</span> &quot; to confirm.
                        </span>

                        <div className="flex items-center border border-muted-foreground sm:focus-within:border-primary rounded p-1 mt-3">
                            <input
                                type="text"
                                placeholder={`Delete ${toDeleteName}`}
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
                            onClick={handleDelete}
                            disabled={isDisabled}
                            className='flex_center gap-2 w-full text-white'>
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
        </div>
    )
}

export default DropdownSettings