// config/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { AuthenticatedRequest } from '../interfaces/user';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req: AuthenticatedRequest, file) => {
        return {
            folder: String(`${process.env.CLOUDINARY_FOLDER}/user_${req.user_id}`),
            format: file.mimetype.split('/')[1] as 'png' | 'jpg' | undefined,
            public_id: file.originalname.split('.')[0],
        };
    },
});

const upload = multer({ storage });

export default upload;
export { cloudinary }
