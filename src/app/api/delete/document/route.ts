import { connectDB } from "@/lib/database";
import DocsModel from "@/models/DocsModel";
import { NextResponse } from "next/server";

type RequestBody = {
    instituteName: string,
    courseName: string,
    subjectName: string,
    unitName: string,
    documentID: string,
}

export async function DELETE(request: Request) {
    const { instituteName, courseName, subjectName, unitName, documentID }: RequestBody = await request.json()

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
                        subject?.units?.forEach((unit: any) => {
                            if (unit?.unitName.toLowerCase() == unitName) {
                                const docIndex = unit.unitDocs?.findIndex((doc: any) => doc._id == documentID)

                                if (docIndex !== -1) {
                                    unit.unitDocs?.pull(unit.unitDocs[docIndex]);
                                    Institute.save();
                                } else {
                                    console.log('Document not found.');
                                }
                            }
                        })
                    }
                })
            }
        })

        return new NextResponse("Document deleted successfully!", { status: 200 });
    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify(err), { status: 500 });
    }
}