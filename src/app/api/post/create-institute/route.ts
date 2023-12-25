import { connectDB } from "@/lib/database"
import DocsModel from "@/models/DocsModel"
import { NextResponse } from "next/server"

interface RequestBody {
    instituteName: string,
    instituteDesc: string,
    registeredBy: string
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()

    try {
        if (!body?.instituteName || !body?.instituteDesc || !body?.registeredBy) {
            return new NextResponse("Missing Fields", { status: 400 })
        }

        await connectDB()
        const InstituteExists = await DocsModel.exists({ instituteName: { '$regex': body?.instituteName, $options: 'i' } })
        if (InstituteExists) {
            return new NextResponse("Institute name already Exists!", { status: 400 })
        }

        await DocsModel.create({
            instituteName: body?.instituteName,
            description: body?.instituteDesc,
            registeredBy: body?.registeredBy
        })

        return new NextResponse("Insitute Created Successfully!", { status: 201 })
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify(err), { status: 500 })
    }
}