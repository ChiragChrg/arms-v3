import { connectDB } from "@/lib/database"
import { NextResponse } from "next/server"
import UserModel from "@/models/UserModel"
import { sign } from "jsonwebtoken";

interface RequestBody {
    email: string,
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()

    try {
        if (!body?.email) {
            return new NextResponse("Missing Field", { status: 400 })
        }

        await connectDB()
        const userExists = await UserModel.findOne({ email: body?.email })
        if (!userExists) {
            return new NextResponse("User does not exist!", { status: 400 })
        }

        const key = sign(
            {
                uid: userExists?._id,
                username: userExists?.username
            },
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: "10min",
            }
        )

        const encryptedLink = `${process.env.NEXTAUTH_URL}/reset-password/${key}`

        const reset = {
            username: userExists?.username,
            email: userExists?.email,
            resetLink: encryptedLink
        }

        return new NextResponse(JSON.stringify({ reset, message: "Email sent Successfully!" }), { status: 201 })
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify(err), { status: 500 })
    }
}