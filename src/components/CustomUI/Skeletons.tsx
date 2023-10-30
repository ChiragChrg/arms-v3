import React from 'react'
import { cn } from '@/lib/utils'

type RectProps = {
    width?: string,
    height?: string,
    radius?: number,
    animation?: "wave" | "pulse"
    className?: string,
}

type CircleProps = {
    size: string,
    animation?: "wave" | "pulse"
    className?: string,
}

export const RectLoader = ({ width = "100%", height = "25px", radius = 0.2, animation = "wave", className = "" }: RectProps) => {
    return (
        <span
            style={{
                width: width,
                height: height,
                borderRadius: `${radius}em`,
                display: "block"
            }}
            className={cn(animation == "wave" ? "SkeletonLoader-wave" : "SkeletonLoader-pulse animate-pulse", className)} />
    )
}

export const CircleLoader = ({ size = "100px", animation = "wave", className = "" }: CircleProps) => {
    return (
        <span
            style={{
                width: size,
                height: size,
                aspectRatio: 1 / 1,
                borderRadius: "100%",
            }}
            className={cn(animation == "wave" ? "SkeletonLoader-wave" : "SkeletonLoader-pulse animate-pulse", className)} />
    )
}