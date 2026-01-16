import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
            console.error("CRITICAL: BLOB_READ_WRITE_TOKEN is missing from .env.local");
            return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
        }

        const buffer = await request.arrayBuffer();

        if (buffer.byteLength === 0) {
            return NextResponse.json({ error: "Payload is empty" }, { status: 400 });
        }

        const blob = await put('encrypted_file.bin', buffer, {
            access: 'public',
            contentType: 'application/octet-stream',
        });

        return NextResponse.json({ id: blob.url.split('/').pop() });

    } catch (error: any) {
        console.error("--- SERVER ERROR START ---");
        console.error(error);
        console.error("--- SERVER ERROR END ---");

        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}