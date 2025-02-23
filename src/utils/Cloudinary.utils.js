import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import {
  cloudinary_cloud_name,
  cloudinary_api_key,
  cloudinary_api_secret,
} from "../constants.js";

cloudinary.config({
  cloud_name: cloudinary_cloud_name,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_api_secret, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File is uploaded succesfully", response.url);
    // this will unlink the file 
    fs.unlinkSync(localFilePath);
    return response;
  } catch (err) {
    fs.unlinkSync(localFilePath); // remove the file locally saved temporary file as the uploaded opration got failed
    return null;
  }
};

export { uploadOnCloudinary };
