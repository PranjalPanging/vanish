import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

export async function POST(request: Request) {
    try {
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
            console.error("CRITICAL: BLOB_READ_WRITE_TOKEN is missing");
            return NextResponse.json({ error: "Vault Configuration Error" }, { status: 500 });
        }

        const fileName = request.headers.get('x-file-name') || 'payload.bin';
        const buffer = await request.arrayBuffer();

        if (buffer.byteLength === 0) {
            return NextResponse.json({ error: "Empty payload rejected" }, { status: 400 });
        }

        const uniquePath = `vault/${nanoid(10)}-${fileName}`;

        const blob = await put(uniquePath, buffer, {
            access: 'public',
            contentType: 'application/octet-stream',
            addRandomSuffix: true,
        });

        return NextResponse.json({
            id: blob.url.split('/').pop(),
            success: true
        });

    } catch (error: any) {
        console.error("--- VAULT SERVER ERROR ---");
        console.error(error.message);

        return NextResponse.json(
            { error: "Protocol Handshake Failed" },
            { status: 500 }
        );
    }
}