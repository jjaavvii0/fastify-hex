import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { MultipartFile } from '@fastify/multipart';

const pump = promisify(pipeline);

export async function saveFile(file: MultipartFile): Promise<string> {
    if (!file) throw new Error("No file provided");

    const savePath = path.join(__dirname, "../../../../uploads", file.filename);
    await pump(file.file, fs.createWriteStream(savePath));

    return `/uploads/${file.filename}`;
}
