import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"

import { connectDB } from "@/lib/database";
import { SignToken } from "@/lib/jwt";
import UserModel from "@/models/UserModel";
import * as bcrypt from "bcrypt"
import { User } from "next-auth";

let UserAccount: User | null = null

export const AuthOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@email.com" },
                password: { label: "Password", type: "password", placeholder: "Enter Password" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        return null
                    }

                    await connectDB()
                    const userExists = await UserModel.findOne({ email: credentials?.email, password: { $exists: true, $ne: null } })
                    const matchPassword = await bcrypt.compare(credentials?.password, userExists?.password)

                    // If no user or If user exists but incorrect password, throw error
                    if (!userExists || !matchPassword) throw new Error("Invalid Email or Password")

                    const userData = {
                        uid: userExists?._id,
                        name: userExists?.username,
                        email: userExists?.email,
                        avatarImg: userExists?.avatarImg,
                        isApproved: userExists?.isApproved,
                    }

                    const accessToken = SignToken(userData)
                    UserAccount = { ...userData, accessToken }

                    return UserAccount
                } catch (err) {
                    console.log(err)
                    return null
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // console.log("\nSignInCallback", { user, account, profile })

            if (account?.type === 'credentials' && UserAccount !== null) return true

            try {
                await connectDB()
                const userExists = await UserModel.findOne({ email: profile?.email })
                if (!userExists) {
                    const newUser = await UserModel.create({
                        username: profile?.name,
                        email: profile?.email,
                        avatarImg: profile?.picture,
                    })

                    user.uid = newUser._id;
                    // console.log("NewOAuth User")
                } else {
                    user.uid = userExists._id;
                    user.isApproved = userExists?.isApproved
                    // console.log("OAuth User Exisits")

                    // Update profile picture only if they dont match
                    if (profile?.picture?.length !== 0 && userExists.avatarImg !== profile?.picture) {
                        userExists.avatarImg = profile?.picture
                        await userExists.save()
                    }
                }
                return true
            } catch (err) {
                console.log("Signin_Callback_Err", err)
                return false
            }
        },
        async jwt({ token, user, account, profile, trigger }) {
            // console.log("\nJWTCallback", { token, user, account, profile, trigger })
            const { picture, sub, ...restToken } = token

            if (trigger === "update") {
                try {
                    await connectDB()
                    const userExists = await UserModel.findOne({ email: token?.email })

                    const userData = {
                        uid: userExists?._id,
                        username: userExists?.username,
                        email: userExists?.email,
                        avatarImg: userExists?.avatarImg,
                        isApproved: userExists?.isApproved,
                    }

                    const accessToken = SignToken(userData)
                    token = { ...userData, accessToken }
                } catch (err) {
                    console.log("Update_Callback_Err", err)
                }
            }

            if (account?.type === "oauth" && typeof user !== typeof undefined) {
                const { id, image, ...restUser } = user
                const newToken = {
                    ...restToken,
                    ...restUser,
                    avatarImg: image,
                    emailVerified: profile?.email_verified
                }
                const accessToken = SignToken(newToken)
                token = { ...newToken, accessToken }
            }
            else if (typeof user !== typeof undefined) {
                token = { ...restToken, ...user }
            }
            // console.log("\nNewToken", token)
            return token
        },
        async session({ session, user, token }) {
            // console.log("\nSessionCallback", { session, user, token })

            if (UserAccount !== null) {
                // console.log("\nUserAccount_Session", UserAccount)
                session.user = UserAccount
            } else {
                session.user = token
            }

            // console.log("\nNewSession", session)
            return session
        },
    },
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    // events: {
    //     signIn(message) {
    //         console.log("\nSignInEvent", message)
    //     },
    //     session(message) {
    //         console.log("\nSessionEvent", message)
    //     },
    //     signOut(message) {
    //         console.log("\nSignOutEvent", message)
    //     },
    // },
    secret: process.env.NEXTAUTH_SECRET,
    // debug: process.env.NODE_ENV === "development",
}