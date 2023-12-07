import { connectDB } from "@/lib/database";
import DocsModel from "@/models/DocsModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const DocsDB = await DocsModel.find({});

        const counts = {
            institute: DocsDB.length,
            course: 0,
            subject: 0,
            document: 0,
        };

        DocsDB.forEach((obj: any) => {
            counts.course += obj.course.length;
            obj.course.forEach((itm: any) => {
                counts.subject += itm.subjects.length;
                itm.subjects.forEach((sub: any) => {
                    counts.document += sub.subjectDocs.length;
                });
            });
        });

        return new NextResponse(JSON.stringify(counts), { status: 200 });
    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify(err), { status: 500 });
    }
}