import multer, { Options } from "multer";
import { getPath } from "@helpers";

const options: Options = {
    storage: multer.diskStorage({
        destination: getPath(process.env.AVATAR_PATH!),
        filename: function (req, file, cb) {
            const fileExtension = file.originalname.split('.')[1];
            const fileName = file.fieldname + '-' + Date.now() + "." + fileExtension;
            return cb(null, fileName);
        }
    }),
    fileFilter: function (req, file, cb) {
        if (!file.mimetype.startsWith('image')) return cb(new Error('Invalid image file'));
        return cb(null, true);
    },
    limits: {
        fileSize: 1 * 1024 * 1024
    }

}


const uploadUserAvatar = multer(options);

export default uploadUserAvatar;