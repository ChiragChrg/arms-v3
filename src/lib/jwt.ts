import jwt, { JwtPayload } from "jsonwebtoken"

interface SignOption {
    expiresIn?: string | number
}

const DEFAULT_SIGN_OPTION = {}

export function SignToken(payload: JwtPayload, option: SignOption = DEFAULT_SIGN_OPTION) {
    const secretKey = process.env.JWT_SECRET_KEY
    const token = jwt.sign(payload, secretKey as string, option)
    return token
}

export function VerifyToken(token: string) {
    try {
        const secretKey = process.env.JWT_SECRET_KEY
        const decoded = jwt.verify(token, secretKey as string)
        return decoded as JwtPayload
    } catch (error) {
        return null
    }
}