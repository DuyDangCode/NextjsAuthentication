
import { verify } from 'jsonwebtoken';
import {cookies} from 'next/headers'
import { NextResponse } from 'next/server';

export async function GET() {
    const cookiesStorage = cookies();
    const user = cookiesStorage.get('UserJWT');

    if(!user){
        return NextResponse.json({message: 'Unauthorized'}, {status: 401});
    }
    
    const {value} = user;
    const secret = process.env.JWT_SECRET || '';

    try {
        verify(value, secret)
        const respone = {message: 'Authorized'};
        return new Response(JSON.stringify(respone), {status: 200})
    } catch (error) {
        return NextResponse.json({message: 'somthing wnet wrong'}, {status: 400})
    }

}