import ejs from "ejs";
import { getAbsPath } from "@helpers";

export default async function renderMailTemplate(templateName: string, data: object) {
    const filePath = getAbsPath(`/views/mails/${templateName}.ejs`);
    return await ejs.renderFile(filePath, data);
}

