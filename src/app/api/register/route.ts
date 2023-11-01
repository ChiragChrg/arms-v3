import { connectDB } from "@/lib/database"
import UserModel from "@/models/UserModel"
import * as bcrypt from "bcrypt"
import { NextResponse } from "next/server"

interface RequestBody {
    name: string,
    email: string,
    password: string
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()

    try {
        if (!body?.name || !body?.email || !body?.password) {
            return new NextResponse("Missing Fields", { status: 400 })
        }

        await connectDB()
        const userExists = await UserModel.findOne({ email: body?.email })
        if (userExists) {
            return new NextResponse("User already Exists!", { status: 400 })
        }

        await UserModel.create({
            username: body?.name,
            email: body?.email,
            password: await bcrypt.hash(body?.password, 10)
        })

        return new NextResponse("User Registered Successfully!", { status: 201 })
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify(err), { status: 500 })
    }
}