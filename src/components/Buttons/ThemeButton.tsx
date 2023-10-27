"use client"

import { SunIcon, MoonIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "../ui/button"


const ThemeButton = () => {
    const { setTheme, resolvedTheme } = useTheme()

    return (
        <Button variant="ghost" size="icon"
            className="rounded-full bg-transparent"
            title={resolvedTheme === "dark" ? "Toggle Light Mode" : "Toggle Dark Mode"}
            onClick={() => resolvedTheme === "dark" ? setTheme("light") : setTheme("dark")}>
            <SunIcon size={24} className="dark:hidden" />
            <MoonIcon size={24} className="hidden dark:block" />
        </Button>
    )
}

export default ThemeButton