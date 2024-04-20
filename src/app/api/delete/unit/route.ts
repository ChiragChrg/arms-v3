import { connectDB } from "@/lib/database";
import DocsModel from "@/models/DocsModel";
import { NextResponse } from "next/server";

type RequestBody = {
    instituteName: string,
    courseName: string,
    subjectName: string,
    unitName: string,
}

export async function DELETE(request: Request) {
    const { instituteName, courseName, subjectName, unitName }: RequestBody = await request.json()

    try {
        await connectDB();
        const Institute = await DocsModel.findOne({ instituteName: { '$regex': instituteName, $options: 'i' } })

        if (!Institute) {
            return new NextResponse("Invalid Institute!", { status: 400 })
        }

        Institute.course.forEach((course: any) => {
            if (course?.courseName.toLowerCase() == courseName) {
                course?.subjects?.forEach((subject: any) => {
                    if (subject?.subjectName.toLowerCase() == subjectName) {
                        const deleteIndex = subject?.units?.findIndex((unit: any) => unit?.unitName.toLowerCase() == unitName);

                        if (deleteIndex !== -1) {
                            subject?.units.pull(subject?.units[deleteIndex]);
                            Institute.save();
                        } else {
                            console.log('Unit not found.');
                        }
                    }
                })
            }
        })

        return new NextResponse("Unit deleted successfully!", { status: 200 });
    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify(err), { status: 500 });
    }
}