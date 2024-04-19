import { connectDB } from "@/lib/database"
import DocsModel from "@/models/DocsModel"
import { NextResponse } from "next/server"

interface RequestBody {
    instituteName: string,
    courseName: string,
    subjectName: string,
    unitName: string,
    unitDesc: string,
    registeredBy: string
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()

    try {
        if (!body?.instituteName || !body?.courseName || !body?.subjectName || !body?.unitName || !body?.unitDesc || !body?.registeredBy) {
            return new NextResponse("Missing Fields", { status: 400 })
        }

        await connectDB()
        const InstituteExists = await DocsModel.findOne({ instituteName: { '$regex': body?.instituteName, $options: 'i' } })

        if (!InstituteExists) {
            return new NextResponse("Invalid Institute!", { status: 400 })
        }

        InstituteExists.course.forEach((course: any) => {
            if (course?.courseName.toLowerCase() == body?.courseName) {
                course?.subjects.forEach((subject: any) => {
                    if (subject.subjectName.toLowerCase() == body?.subjectName) {
                        subject.units.push({
                            unitName: body?.unitName,
                            unitDesc: body?.unitDesc,
                            unitCreator: body?.registeredBy
                        });
                    }
                });
            }
        })
        await InstituteExists.save()

        return new NextResponse("Subject Created Successfully!", { status: 201 })
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify(err), { status: 500 })
    }
}
