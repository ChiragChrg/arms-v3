"use client"

import { SunIcon, MoonIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "../ui/button"


const ThemeButton = () => {
    const { setTheme, resolvedTheme } = useTheme()

    return (
        <Button variant="outline" size="icon" className="rounded-full bg-transparent"
            onClick={() => resolvedTheme === "dark" ? setTheme("light") : setTheme("dark")}>
            <SunIcon width="24px" height="24px" className="dark:hidden" />
            <MoonIcon width="24px" height="24px" className="hidden dark:block" />
        </Button>
    )
}

export default ThemeButton