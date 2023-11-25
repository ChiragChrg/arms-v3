import { Fragment } from 'react'
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from '@/lib/utils'

type Props = {
    defaultRoute?: string,
    routes?: string[],
    className?: string,
}

const NavRoute = ({ defaultRoute = "dashboard", routes = [], className = "" }: Props) => {
    //Custome made Route Map
    //Default Root Path is "Dashboard", can be changed using @defaultRoute prop 

    //Send an array of object with {path:String} which is also your path to different components
    //and also pass state to specific path
    //// example: [
    //     {path:"Product"},
    //     {path:"Details", state:data},
    //     {path:"Payment", state:data.payment}
    // ] etc.

    //If You have a route within the same parent, include the parent with "/"
    //// example: [
    //     {path:"Institutes"},
    //     {path:"Institutes/New"},
    // ]
    // the path will be "institute/new" & lable is "New"

    return (
        <div className={cn("w-full hidden lg:flex items-center", className)}>
            <Link href={`/${defaultRoute.toLowerCase()}`} className='capitalize'>
                {defaultRoute}
            </Link>

            {routes.map((path, index) => {
                return (
                    <Fragment key={index}>
                        <ChevronRight size={18} className="text-slate-400" />
                        <Link href={`/${path?.toLowerCase()}`} className='capitalize last:text-primary last:font-medium'>
                            {path?.includes("/") ? path?.split("/").pop() : path}
                        </Link>
                    </Fragment>
                )
            }
            )}
        </div>
    )
}

export default NavRoute