import path from "path";

export function getAbsPath(filePath: string) {
    const environment = process.env.NODE_ENV;
    const mainFolder = environment === "production" ? "dist" : "src";
    return path.join(process.cwd(), mainFolder, filePath);
}

export function getPath(filePath: string) {
    return path.join(process.cwd(), filePath);
}
