import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
dotenv.config({});

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadMediaToCloudinary = async (filePath) => {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: "auto",
      });
  
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Error uploading to cloudinary");
    }
  };
  
  export const deleteMediaFromCloudinary = async (publicId, resourceType) => {
    try {
      return await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
      });
    } catch (error) {
      console.log(error);
      throw new Error("failed to delete assest from cloudinary");
    }
  };