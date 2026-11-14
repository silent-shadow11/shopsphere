import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { Apierror } from "./ApiError.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UploadOnCloudinary = async (localFilePath, folderName) => {
  try {
    if (!localFilePath) return null;
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      asset_folder: `ShopSphere/users/${folderName}`,
    });

    return result;
  } catch (error) {
    return null;
  } finally {
    try {
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    } catch (error) {
      console.error("Temporary file cleanup failed:", error);
    }
  }
};

const DeleteOnCloudinary = async (publicId) => {
  if (!publicId) {
    throw new Apierror(404, "Public Id are required...");
  }

  const res = await cloudinary.uploader.destroy(publicId);

  if (res.result !== "ok" && res.result !== "not found") {
    throw new Apierror(500, "Image deletion failed");
  }
  return res;
};

export { UploadOnCloudinary, DeleteOnCloudinary };
