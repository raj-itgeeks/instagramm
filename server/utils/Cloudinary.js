import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
export const uploadOnCloudinay = async (localpath) => {
    try {
        if (!localpath) return null;
        const file = await cloudinary.uploader.upload(localpath, {
            resource_type: 'auto',
        });
        return file;
    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        throw error;
    }
}