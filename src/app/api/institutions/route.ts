import { connectDB } from "@/lib/database";
import DocsModel from "@/models/DocsModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const DocsDB = await DocsModel.find({}).populate({
            path: "course.subjects.subjectDocs.docUploader",
            select: 'username email avatarImg'
        });

        return new NextResponse(JSON.stringify(DocsDB), { status: 200 });
    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify(err), { status: 500 });
    }
}