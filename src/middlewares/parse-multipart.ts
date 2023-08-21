import fs from 'fs/promises';
import { Request, Response, NextFunction } from "express";
import { getPath } from '@helpers';

export class HttpFile {

    public fileName: string;
    public encoding: string;
    public mimeType: string;
    public buffer: Buffer | null;
    public fileSize: number;

    constructor(fileName: string, encoding: string, mimeType: string, buffer: Buffer | null, fileSize: number) {
        this.fileName = fileName;
        this.encoding = encoding;
        this.mimeType = mimeType;
        this.buffer = buffer;
        this.fileSize = fileSize;
    }

    async save(path: string) {
        const filePath = getPath(path);
        await fs.writeFile(filePath, this.buffer!);
    }

}


export async function parseMultipart(req: Request, res: Response, next: NextFunction) {

    if (req.busboy) {

        const body: { [key: string]: any } = {};

        req.busboy.on('file', function (name, file, info) {
            const httpFile = new HttpFile(info.filename, info.encoding, info.mimeType, null, 0);
            const fileChunks: Uint8Array[] = [];

            file.on('data', (data) => fileChunks.push(data));

            file.on('close', function () {
                const buffer = Buffer.concat(fileChunks);
                httpFile.buffer = buffer;
                httpFile.fileSize = buffer.length;
                body[name] = httpFile;
            });
        });


        req.busboy.on('field', (name, value) => body[name] = value);

        req.busboy.on('close', function () {
            req.body = body;
            next();
        });

        req.pipe(req.busboy);
    }
    else {
        next();
    }

}