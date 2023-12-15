"use client"
import { useEffect, useState } from 'react'
import { User2 } from 'lucide-react'
import Image from 'next/image'
import { CircleLoader } from './Skeletons'

type Props = {
    url: string | undefined | null,
    size?: number
}

const AvatarImage = ({ url, size = 40 }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!url)
            setIsLoading(false)
    }, [url])

    return (
        <div className="flex_center aspect-square rounded-full overflow-hidden">
            <CircleLoader size={`${size}px`} className={isLoading ? 'block' : "hidden"} />
            {url ?
                <Image
                    src={url}
                    alt='User_Avatar'
                    width={size}
                    height={size}
                    onLoad={() => setIsLoading(false)}
                    loading='eager'
                    className={isLoading ? 'hidden' : "block object-cover"}
                />
                :
                <div style={{ width: size, height: size }} className={isLoading ? 'hidden' : "flex_center bg-slate-400 text-white w-full aspect-square rounded-full"}>
                    <User2 className='w-full h-full p-1.5' />
                </div>
            }
        </div>
    )
}

export default AvatarImage