"use server"
import { connectDB } from "@/lib/database";
import UserModel from "@/models/UserModel";
import * as bcrypt from "bcrypt"

type RequestBody = {
    username: string,
    email: string,
    password: string
}

type ResponseType = {
    status: number,
    message: string,
}

export async function registerUser({ username, email, password }: RequestBody) {
    if (!username || !email || !password) {
        throw new Error("Missing Fields")
    }

    try {
        await connectDB();
        const userExists = await UserModel.findOne({ email: email })
        if (userExists) {
            throw new Error("User already Exists!")
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await UserModel.create({
            username: username,
            email: email,
            password: hashedPassword
        })

        return {
            status: 201,
            message: "User Created Successfully!"
        } as ResponseType
    } catch (err: any) {
        console.error(err);
        throw new Error(err.message)
    }
}