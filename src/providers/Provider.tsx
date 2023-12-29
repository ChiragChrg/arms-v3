"use client"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import ModalProvider from "./ModalProvider"
import { EdgeStoreProvider } from "@/lib/edgestore"
import LoaderUI from "@/components/LoaderUI"
import useLoaderStore from "@/store/useLoaderStore"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            retry: 1,
        },
    },
})

const Provider = ({ children, ...props }: ThemeProviderProps) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const { showLoader } = useLoaderStore()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMounted(true)
        }
    }, [])

    if (isMounted)
        return (
            <QueryClientProvider client={queryClient}>
                <ThemeProvider {...props}>
                    <SessionProvider refetchOnWindowFocus={true}>
                        <EdgeStoreProvider>
                            {children}
                        </EdgeStoreProvider>
                    </SessionProvider>

                    {/* Loader Overlay while User is fetched */}
                    {showLoader && <LoaderUI />}

                    <ModalProvider />
                    <Toaster position="bottom-right" />
                    <ReactQueryDevtools initialIsOpen={false} />
                </ThemeProvider>
            </QueryClientProvider>
        )
}

export default Provider