"use server"
import { revalidatePath } from "next/cache"

const revalidateCache = async (path?: string) => {
    try {
        if (path)
            revalidatePath(path)
        else {
            revalidatePath("/")
        }
    } catch (error) {
        console.error("revalidateCache=> ", error)
    }
}

export default revalidateCache