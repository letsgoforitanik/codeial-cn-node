import workerpool from "workerpool";
import { mailTransporter } from "@config";

async function sendMail(to: string, subject: string, body: string) {

    const options = {
        subject: subject,
        to: to,
        from: process.env.MAIL_USERNAME,
        html: body
    };

    const info = await mailTransporter.sendMail(options);

    console.log('Mail Info : ', info);
}

workerpool.worker({ sendMail });