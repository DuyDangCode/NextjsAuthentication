import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

const maxAge = 60 * 5;

export async function POST(request: Request) {
    const body = await request.json();
    const {username, password} = body;
    
    if(username !== 'admin' || password !== 'admin'){
        return NextResponse.json({message:'Unauthorized'}, {status: 401})
    }

    const secret = process.env.JWT_SECRET || ''
    
    const tokens = sign({username: username, password: password}, secret, {expiresIn: maxAge})

    const seralized = serialize('UserJWT', tokens, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: maxAge
    })

    return NextResponse.json({message: 'Authorized'}, {status: 200, headers: {'Set-Cookie': seralized},})
}

export async function GET(request: Request) {
    return NextResponse.json({message:'oke'})
}