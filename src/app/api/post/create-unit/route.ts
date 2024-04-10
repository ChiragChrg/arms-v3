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
        const InstituteExists = await DocsModel.findOne({
            "instituteName": { '$regex': body?.instituteName, $options: 'i' },
            "course.courseName": { '$regex': body?.courseName, $options: 'i' },
            "course.subjects.subjectName": { '$regex': body?.subjectName, $options: 'i' },
        }, {
            course: {
                $elemMatch: { courseName: { '$regex': body?.courseName, $options: 'i' } },
                "subjects": {
                    $elemMatch: { subjectName: { '$regex': body?.subjectName, $options: 'i' } }
                }
            }
        })

        const subjectExists = InstituteExists?.course[0]?.subjects[0];

        if (!subjectExists) {
            return new NextResponse("Subject not found!", { status: 400 });
        }

        subjectExists.units.push({
            unitName: body?.unitName,
            unitDesc: body?.unitDesc,
            unitCreator: body?.registeredBy
        });

        await InstituteExists.save()

        return new NextResponse("Subject Created Successfully!", { status: 201 })
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify(err), { status: 500 })
    }
}