import { connectDB } from "@/lib/database";
import DocsModel from "@/models/DocsModel";
import { NextResponse, NextRequest } from "next/server";

type RequestBody = {
    instituteId: string,
    courseId: string,
    subjectId: string,
    unitId: string,
    uploaderId: string,
    FilesMeta: {
        docName: string,
        docSize: string,
        docLink: string,
        docUploader: string,
    }[],
}

export async function POST(request: NextRequest) {
    const { instituteId, courseId, subjectId, unitId, uploaderId, FilesMeta }: RequestBody = await request.json();

    try {
        await connectDB();
        const DocsDB = await DocsModel.findById(instituteId);
        if (!DocsDB) {
            return new NextResponse("Institute not found!", { status: 400 })
        }

        const courseObj = DocsDB?.course?.find((obj: Record<string, any>) => obj._id == courseId);
        if (courseObj) {
            const subjectObj = courseObj?.subjects?.find((subj: Record<string, any>) => subj._id == subjectId);
            if (subjectObj) {
                const unitObj = subjectObj?.units?.find((unit: Record<string, any>) => unit._id == unitId);
                FilesMeta.forEach((file) => {
                    unitObj.unitDocs.push({
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
