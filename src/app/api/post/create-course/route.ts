import { connectDB } from "@/lib/database"
import DocsModel from "@/models/DocsModel"
import { NextResponse } from "next/server"

interface RequestBody {
    instituteName: string,
    courseName: string,
    courseDesc: string,
    registeredBy: string
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()

    try {
        if (!body?.instituteName || !body?.courseName || !body?.courseDesc || !body?.registeredBy) {
            return new NextResponse("Missing Fields", { status: 400 })
        }

        await connectDB()
        const InstituteExists = await DocsModel.findOne({ instituteName: { '$regex': body?.instituteName, $options: 'i' } })
        if (!InstituteExists) {
            return new NextResponse("Institute not found!", { status: 400 })
        }

        InstituteExists.course.push({
            courseName: body?.courseName,
            courseDesc: body?.courseDesc,
            courseCreator: body?.registeredBy
        })

        await InstituteExists.save()

        return new NextResponse("Course Created Successfully!", { status: 201 })
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify(err), { status: 500 })
    }
}