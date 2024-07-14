import { cloudinary } from "../configs/cloudinary";

const deleteFile = async (public_id: string) => {
    try {
        await cloudinary.uploader.destroy(public_id);
    } catch (deleteError) {
        console.log(deleteError);
    }
}

export default deleteFile