"use client"

import React, { useState } from 'react'
import { PlayCircleIcon, PauseCircle } from "lucide-react"
import { Button } from './ui/button'

type Props = {
    trailCount?: number,
    xOffset?: string,
    rotate?: string,
    leftBtn?: boolean
}

const Trails = ({ trailCount = 10, xOffset = "45%", rotate = "-45deg", leftBtn = false }: Props) => {
    const [disableAnimation, setDisableAnimation] = useState<boolean>(false)
    const trailArray = Array.from({ length: trailCount }, (_, index) => index + 1);

    return (
        <>
            <div className="fixed inset-0 flex_center w-screen h-screen overflow-hidden -z-10">
                <div
                    style={{
                        rotate: rotate,
                        transform: `translateY(${xOffset})`,
                    }}
                    className={`fixed w-[200%] h-[80%] bg-primary`}>
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
                className={`absolute bottom-4 text-primary z-50 hover:text-primary ${leftBtn ? "left-4" : "right-4"}`}
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