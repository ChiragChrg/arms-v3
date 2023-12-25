import { connectDB } from "@/lib/database"
import UserModel from "@/models/UserModel"
import { NextResponse } from "next/server"

interface RequestBody {
    uid: string,
    approval: "approve" | "reject"
}

export async function POST(request: Request) {
    const { uid, approval }: RequestBody = await request.json()
    let isUserApproved: boolean | null = null

    try {
        await connectDB()

        if (approval === "approve") {
            const User = await UserModel.findById(uid)
            User.isApproved = true
            User.save()
            isUserApproved = true
        } else {
            await UserModel.findByIdAndDelete(uid)
            isUserApproved = false
        }

        return new NextResponse(JSON.stringify({
            isUserApproved,
            message: `User ${approval == "approve" ? "Approved" : "Rejected"}!`,
        }), { status: 201 })
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify(err), { status: 500 })
    }
}