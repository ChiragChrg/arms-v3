import { connectDB } from "@/lib/database";
import DocsModel from "@/models/DocsModel";
import { NextResponse } from "next/server";

type RequestBody = {
    instituteName: string,
    courseName: string,
    subjectName: string,
}

export async function DELETE(request: Request) {
    const { instituteName, courseName, subjectName }: RequestBody = await request.json()

    try {
        await connectDB();
        const Institute = await DocsModel.findOne({ instituteName: { '$regex': instituteName, $options: 'i' } })

        if (!Institute) {
            return new NextResponse("Invalid Institute!", { status: 400 })
        }

        Institute.course.forEach((course: any) => {
            if (course?.courseName.toLowerCase() == courseName) {
                const deleteIndex = course?.subjects.findIndex((subject: any) => subject.subjectName.toLowerCase() == subjectName);

                if (deleteIndex !== -1) {
                    course?.subjects.pull(course?.subjects[deleteIndex]);
                    Institute.save();
                } else {
                    console.log('Subject not found.');
                }
            }
        })

        return new NextResponse("Subject deleted successfully!", { status: 200 });
    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify(err), { status: 500 });
    }
}