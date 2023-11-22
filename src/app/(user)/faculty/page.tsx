import MobileHeader from '@/components/MobileHeader'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CheckIcon, TimerIcon, MoreVerticalIcon } from 'lucide-react'
import Image from 'next/image'

const page = () => {
    return (
        <section className='section_style'>
            <MobileHeader />

            <h1 className='text-[1.6em] sm:text-[2em] font-bold'>
                Registered
                <span className="text-primary"> Faculty</span>
            </h1>

            {/* Table Ui for Desktop screen */}
            <Table className='hidden xl:table'>
                <TableHeader>
                    <TableRow>
                        <TableHead className="px-2 sm:px-4 py-2">Username</TableHead>
                        <TableHead className="px-2 sm:px-4 py-2">Email</TableHead>
                        <TableHead className='px-2 sm:px-4 py-2 hidden sm:table-cell'>Status</TableHead>
                        <TableHead className='px-2 sm:px-4 py-2 sm:table-cell'>DOJ</TableHead>
                        <TableHead className="px-2 sm:px-4 py-2 w-fit text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="px-2 sm:px-4 py-2 flex items-center gap-2">
                            <Image
                                src={`https://lh3.googleusercontent.com/a/ACg8ocKN_cxM7GeXLpVDXqdYDF3X1SkyS8inCzY1l3NwyAPSrQI=s96-c`}
                                width={40}
                                height={40}
                                alt='User_Image'
                                className='rounded-full' />
                            <span className='font-medium capitalize'>ChiragChrg</span>
                        </TableCell>
                        <TableCell className="px-2 sm:px-4 py-2">chiruchirag2001@gmail.com</TableCell>
                        <TableCell className='px-2 sm:px-4 py-2'>
                            {false ?
                                <div className=' text-green-500 flex items-center gap-2 drop-shadow-sm'>
                                    <CheckIcon size={20} />
                                    <span>Approved</span>
                                </div>
                                :
                                <div className='text-yellow-500 flex items-center gap-2 drop-shadow-sm'>
                                    <TimerIcon size={20} />
                                    Pending
                                </div>
                            }
                        </TableCell>
                        <TableCell className='px-2 sm:px-4 py-2 sm:table-cell'>12 Aug 2023</TableCell>
                        <TableCell className='px-2 sm:px-4 py-2 sm:table-cell text-center'>
                            <Button size="icon" variant='ghost'>
                                <MoreVerticalIcon />
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            {/* Card Ui for Mobile screen */}
            <div className="grid xl:hidden grid-cols-1 md:grid-cols-2 mt-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Image
                            src={`https://lh3.googleusercontent.com/a/ACg8ocKN_cxM7GeXLpVDXqdYDF3X1SkyS8inCzY1l3NwyAPSrQI=s96-c`}
                            width={40}
                            height={40}
                            alt='User_Image'
                            className='rounded-full' />

                        <div className="flex flex-col">
                            <span className='font-medium capitalize'>ChiragChrg</span>
                            <span className='text-[0.8em] opacity-80'>chiruchirag2001@gmail.com</span>
                        </div>

                        {true ?
                            <CheckIcon size={25} className='text-green-500 drop-shadow-sm' />
                            :
                            <TimerIcon size={25} className='text-yellow-500 drop-shadow-sm' />
                        }
                    </div>

                    <Button size="icon" variant='ghost'>
                        <MoreVerticalIcon />
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default page