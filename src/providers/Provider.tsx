"use client"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import ModalProvider from "./ModalProvider"
import { EdgeStoreProvider } from "@/lib/edgestore"

const Provider = ({ children, ...props }: ThemeProviderProps) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMounted(true)
        }
    }, [])

    if (isMounted)
        return (
            <ThemeProvider {...props}>
                <SessionProvider refetchOnWindowFocus={true}>
                    <EdgeStoreProvider>
                        {children}
                    </EdgeStoreProvider>
                </SessionProvider>

                <ModalProvider />
                <Toaster position="bottom-right" />
            </ThemeProvider>
        )
}

export default Provider