import { connectDB } from "@/lib/database";
import DocsModel from "@/models/DocsModel";
import { NextResponse } from "next/server";

type RequestBody = {
    instituteName: string,
    courseName: string,
}

export async function DELETE(request: Request) {
    const { instituteName, courseName }: RequestBody = await request.json()

    try {
        await connectDB();
        const Institute = await DocsModel.findOne({ instituteName: { '$regex': instituteName, $options: 'i' } })

        if (!Institute) {
            return new NextResponse("Invalid Institute!", { status: 400 })
        }

        const deleteIndex = Institute.course.findIndex((course: any) => course.courseName.toLowerCase() == courseName);

        if (deleteIndex !== -1) {
            Institute.course.pull(Institute.course[deleteIndex]);
            Institute.save();
        } else {
            console.log('Course not found.');
        }

        return new NextResponse("Course deleted successfully!", { status: 200 });
    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify(err), { status: 500 });
    }
}