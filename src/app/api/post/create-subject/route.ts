import { connectDB } from "@/lib/database"
import DocsModel from "@/models/DocsModel"
import { NextResponse } from "next/server"

interface RequestBody {
    instituteName: string,
    courseName: string,
    subjectName: string,
    subjectDesc: string,
    registeredBy: string
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()

    try {
        if (!body?.instituteName || !body?.courseName || !body?.subjectName || !body?.subjectDesc || !body?.registeredBy) {
            return new NextResponse("Missing Fields", { status: 400 })
        }

        await connectDB()
        const InstituteExists = await DocsModel.findOne({
            "instituteName": { '$regex': body?.instituteName, $options: 'i' },
            "course.courseName": { '$regex': body?.courseName, $options: 'i' },
        }, {
            course: {
                $elemMatch: { courseName: { '$regex': body?.courseName, $options: 'i' } },
            },
        })
        const courseExists = InstituteExists?.course[0]

        if (!courseExists) {
            return new NextResponse("Course not found!", { status: 400 })
        }

        courseExists.subjects.push({
            subjectName: body?.subjectName,
            subjectDesc: body?.subjectDesc,
            subjectCreator: body?.registeredBy
        })

        await InstituteExists.save()

        return new NextResponse("Subject Created Successfully!", { status: 201 })
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify(err), { status: 500 })
    }
}