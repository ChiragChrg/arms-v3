import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id?: string | null,
        uid?: string | null,
        name?: string | null,
        email?: string | null,
        image?: string | null,
        avatarImg?: string | null,
        phone?: string | null,
        emailVerified?: boolean | null,
        accessToken?: string | null,
        isApproved?: boolean | null,
    }

    interface Session {
        user?: User,
        expires?: string
    }

    interface Profile {
        email_verified?: boolean,
        picture?: string,
        accessToken?: string
    }
}