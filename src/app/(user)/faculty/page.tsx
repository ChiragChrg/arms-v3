import MobileHeader from '@/components/MobileHeader'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CheckIcon, TimerIcon } from 'lucide-react'
import Image from 'next/image'

const page = () => {
    return (
        <section className='section_style'>
            <MobileHeader />

            <h1 className='text-[1.6em] sm:text-[2em] font-bold'>
                Registered
                <span className="text-primary"> Faculty</span>
            </h1>

            <Table>
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
                        {false ?
                            <TableCell className='px-2 sm:px-4 py-2 text-green-500 flex items-center gap-2 drop-shadow-sm'>
                                <CheckIcon size={20} />
                                <span>Approved</span>
                            </TableCell>
                            :
                            <TableCell className='px-2 sm:px-4 py-auto text-yellow-500 flex items-center gap-2 drop-shadow-sm'>
                                <TimerIcon size={20} />
                                Pending
                            </TableCell>
                        }
                        <TableCell className='px-2 sm:px-4 py-2 sm:table-cell'>12 Aug 2023</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </section>
    )
}

export default page