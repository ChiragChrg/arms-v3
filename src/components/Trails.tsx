"use client"

import React, { useState } from 'react'
import { PlayCircleIcon, PauseCircle } from "lucide-react"
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

type Props = {
    trailCount?: number,
    xOffset?: string,
    yOffset?: string,
    rotate?: string,
    className?: string,
    leftBtn?: boolean,
    buttonClass?: string,
    offsetDirection?: "left" | "center" | "right"
    height?: string,
}

const Trails = ({ trailCount = 10, xOffset = "0", yOffset = "45%", rotate = "-45deg", className = "", leftBtn = false, buttonClass = "", offsetDirection = "left", height = "" }: Props) => {
    const [disableAnimation, setDisableAnimation] = useState<boolean>(false)
    const trailArray = Array.from({ length: trailCount }, (_, index) => index + 1);

    if (typeof window !== undefined && window.devicePixelRatio == 1.25) {
        if (offsetDirection === "center")
            yOffset = "0%"
        else
            if (offsetDirection === "right") {
                yOffset = "45%"
                height = "100%"
            }
            else
                yOffset = "50%"
    }

    return (
        <>
            <div className="fixed inset-0 flex_center w-full h-full overflow-hidden z-[-10] TrailZoom">
                <div
                    style={{
                        rotate: rotate,
                        transform: `translateY(${yOffset}) translateX(${xOffset})`,
                        height: height
                    }}
                    className={cn(`fixed w-[200%] h-[85%] bg-logoClr`, className)}>
                    <div className="relative flex flex-col justify-evenly w-full h-full">
                        {/* <div className="absolute flex_center w-full h-full">
                            <div className=" w-[100px] h-full bg-red-600"></div>
                        </div> */}
                        {trailArray.map((item: number) => (
                            <div
                                key={item}
                                data-disableanimation={disableAnimation}
                                style={{
                                    backgroundColor: `${item % 2 == 0 ? "var(--trailClrA)" : "var(--trailClrB)"}`,
                                    height: `calc(100% / (${trailCount} * 3))`
                                }}
                                className='Trails-Trail w-full rounded-full' />
                        ))}
                    </div>
                </div>
            </div>

            <Button variant='ghost' size='icon'
                className={cn("absolute bottom-4 text-primary z-10 hover:text-primary", leftBtn ? "left-4" : "right-4", buttonClass)}
                onClick={() => setDisableAnimation(prev => !prev)}
                title={disableAnimation ? "Play Animation" : "Pause Animation"}>
                {disableAnimation ?
                    <PlayCircleIcon size={30} />
                    : <PauseCircle size={30} />
                }
            </Button>
        </>
    )
}

export default Trails