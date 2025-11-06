import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;


interface DecodedUser extends JwtPayload{
    id: string;
    name?: string;
    email?: string;
    role?: string;
}

export function signToken(payload: { id: string; name?: string; email?: string; role?: string }){
    return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): DecodedUser | null{
    try{

        const decoded =  jwt.verify(token, SECRET)
        if(typeof decoded === "string") return null;

        // اطمینان از وجود id در decoded
        if (!decoded.id) return null;

        return decoded as DecodedUser;
    }catch {
        return null
    }
}