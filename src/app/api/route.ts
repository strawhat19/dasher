import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        health: `100%`,
        status: `ok`,
        message: `Welcome to Dasher API's`,
        routes: [
            `/api/healthcheck`,
            `/api/collision`,
            `/api/geodata`,
            `/api/github`,
        ],
    });
}