import { connectDB } from "@/lib/database"
import UserModel from "@/models/UserModel"
import * as bcrypt from "bcrypt"
import { NextResponse } from "next/server"

interface RequestBody {
    username: string,
    email: string,
    password: string
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()

    try {
        if (!body?.username || !body?.email || !body?.password) {
            return new NextResponse("Missing Fields", { status: 400 })
        }

        await connectDB()
        const userExists = await UserModel.findOne({ email: body?.email })
        if (userExists) {
            return new NextResponse("User already Exists!", { status: 400 })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body?.password, salt);

        await UserModel.create({
            username: body?.username,
            email: body?.email,
            password: hashedPassword
        })

        return new NextResponse("User Registered Successfully!", { status: 201 })
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify(err), { status: 500 })
    }
}