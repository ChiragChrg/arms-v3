import { connectDB } from "@/lib/database";
import DocsModel from "@/models/DocsModel";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { instituteId, courseId, subjectId, uploadedBy, FilesData } = await request.json();

    try {
        await connectDB();
        const DocsDB = await DocsModel.findOne({ "_id": instituteId })
        const courseObj = DocsDB.course.find((obj: Record<string, any>) => obj._id == courseId);

        if (courseObj) {
            const subjectObj = courseObj.subjects.find((subj: Record<string, any>) => subj._id == subjectId);

            if (subjectObj) {
                FilesData.forEach((file: Record<string, any>) => {
                    subjectObj.subjectDocs.push({
                        docId: file.docId,
                        docName: file.docName,
                        docSize: file.docSize,
                        docLink: file.docLink,
                        docUploader: uploadedBy,
                    });
                })
            }
        }
        await DocsDB.save();

        return new NextResponse(JSON.stringify({ message: "Files Uploaded Successfully", }), { status: 201 });
    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify(err), { status: 500 });
    }
}
