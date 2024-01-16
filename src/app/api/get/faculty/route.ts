import { connectDB } from "@/lib/database";
import { NextResponse } from "next/server";
import UserModel from "@/models/UserModel";

export async function GET(request: Request) {
    try {
        await connectDB();
        const faculty = await UserModel.find({}).select("-password")

        return new NextResponse(JSON.stringify(faculty), { status: 200 });
    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify(err), { status: 500 });
    }
}