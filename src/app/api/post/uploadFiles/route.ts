import { connectDB } from "@/lib/database";
import DocsModel from "@/models/DocsModel";
import { NextResponse, NextRequest } from "next/server";

type RequestBody = {
    instituteId: string,
    courseId: string,
    subjectId: string,
    uploaderId: string,
    FilesData: {
        docName: string,
        docSize: string,
        docLink: string,
        docUploader: string | null,
    }[],
}

export async function POST(request: NextRequest) {
    const { instituteId, courseId, subjectId, uploaderId, FilesData }: RequestBody = await request.json();

    try {
        await connectDB();
        const DocsDB = await DocsModel.findOne({ "_id": instituteId });
        const courseObj = DocsDB.course.find((obj: Record<string, any>) => obj._id == courseId);

        if (courseObj) {
            const subjectObj = courseObj.subjects.find((subj: Record<string, any>) => subj._id == subjectId);

            if (subjectObj) {
                FilesData.forEach((file: Record<string, any>) => {
                    subjectObj.subjectDocs.push({
                        docName: file.docName,
                        docSize: file.docSize,
                        docLink: file.docLink,
                        docUploader: uploaderId,
                    });
                })
            }
        }
        await DocsDB.save();

        return new NextResponse(JSON.stringify({ message: "Files Uploaded Successfully", DocsDB }), { status: 201 });
    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify(err), { status: 500 });
    }
}
