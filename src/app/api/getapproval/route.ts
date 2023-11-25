import { connectDB } from "@/lib/database";
import { NextResponse } from "next/server";
import UserModel from "@/models/UserModel";

export async function GET(request: Request) {
    try {
        await connectDB();
        const users = await UserModel.find({ isApproved: false })

        return new NextResponse(JSON.stringify(users), { status: 200 });
    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify(err), { status: 500 });
    }
}