import { connectDB } from "@/lib/database"
import { NextResponse } from "next/server"
import UserModel from "@/models/UserModel"
import { Resend } from "resend"
import EmailTemplate from "@/components/EmailTemplate";
import { sign } from "jsonwebtoken";

interface RequestBody {
    email: string,
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    const body: RequestBody = await request.json()

    try {
        if (!body?.email) {
            return new NextResponse("Missing Field", { status: 400 })
        }

        await connectDB()
        const userExists = await UserModel.findOne({ email: body?.email })
        if (!userExists) {
            return new NextResponse("User does not exist!", { status: 400 })
        }

        const key = sign(
            { uid: userExists?._id },
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: "10min",
            }
        )
        console.log("key", key)

        const encryptedLink = `${process.env.NEXTAUTH_URL}/reset-password/${key}`
        console.log("encryptedLink", encryptedLink)

        const data = await resend.emails.send({
            from: 'ARMS <chiragchrg.netlify.app>',
            to: [`${userExists?.email}`],
            subject: 'RESET PASSWORD | ARMS ',
            react: EmailTemplate({
                username: userExists?.username,
                email: userExists?.email,
                resetLink: encryptedLink
            }),
        });

        return new NextResponse(JSON.stringify({ data, message: "Email sent Successfully!" }), { status: 201 })
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify(err), { status: 500 })
    }
}