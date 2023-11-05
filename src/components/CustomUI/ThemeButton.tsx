"use client"
import { SunIcon, MoonIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

type Props = {
    size?: string | number,
    className?: string,
}

const ThemeButton = ({ size = 24, className = "" }: Props) => {
    const { setTheme, resolvedTheme } = useTheme()

    return (
        <Button variant="ghost" size="icon"
            className={cn("rounded-full bg-transparent border border-white/30 sm:hover:bg-white sm:hover:text-baseClr", className)}
            title={resolvedTheme === "dark" ? "Toggle Light Mode" : "Toggle Dark Mode"}
            onClick={() => resolvedTheme === "dark" ? setTheme("light") : setTheme("dark")}>
            <SunIcon size={size} className="dark:hidden" />
            <MoonIcon size={size} className="hidden dark:block" />
        </Button>
    )
}

export default ThemeButton