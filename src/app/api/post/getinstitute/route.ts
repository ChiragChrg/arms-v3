import { connectDB } from "@/lib/database";
import DocsModel from "@/models/DocsModel";
import { NextResponse } from "next/server";

interface RequestBody {
    collegeName: string,
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()

    try {
        await connectDB();
        const Institute = await DocsModel.findOne({ collegeName: { '$regex': body?.collegeName, $options: 'i' } })
            .populate({
                path: 'registeredBy',
                select: 'username email avatarImg',
            })
            .populate({
                path: 'course.courseCreator',
                select: 'username email avatarImg',
            })
            .populate({
                path: 'course.subjects.subjectCreator',
                select: 'username email avatarImg',
            })
            .populate({
                path: 'course.subjects.subjectDocs.docUploader',
                select: 'username email avatarImg',
            })

        if (Institute == null) {
            return new NextResponse("Invalid Institute!", { status: 400 })
        }

        return new NextResponse(JSON.stringify(Institute), { status: 200 });
    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify(err), { status: 500 });
    }
}