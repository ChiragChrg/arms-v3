import { connectDB } from "@/lib/database"
import { NextResponse } from "next/server"
import UserModel from "@/models/UserModel"
import * as bcrypt from "bcrypt"

interface RequestBody {
    uid: string,
    password: string,
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()

    try {
        if (!body?.uid || !body.password) {
            return new NextResponse("Missing Fields", { status: 400 })
        }

        await connectDB()
        const userExists = await UserModel.findById(body?.uid)
        if (!userExists) {
            return new NextResponse("User does not exist!", { status: 400 })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body?.password, salt);

        userExists.password = hashedPassword
        userExists.save()

        return new NextResponse(JSON.stringify({ message: "Password reset successful!" }), { status: 201 })
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify(err), { status: 500 })
    }
}