import File from "../models/file.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.config.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Path from "path";
export const uploadResource = asyncHandler(async (req, res) => {
  const { file } = req;
  const localFilePath = file.path;

  const fileExtension = Path.extname(localFilePath);
  if (![".pdf", ".docx", ".doc"].includes(fileExtension)) {
    throw new ApiError(400, "Invalid file type.");
  }
  try {
    const response = await uploadOnCloudinary(localFilePath);
    if (!response) {
      throw new ApiError(500, "File upload failed.");
    }

    const newFile = new File({
      fileUrl: response.url,
      fileName: file.originalname,
      user: req.user._id,
      fileType: fileExtension,
    });

    await newFile.save();

    res
      .status(201)
      .json(new ApiResponse(201, newFile, "file uploaded successfully."));
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "An error occurred while uploading the resource."
    );
  }
});
export const getResources = asyncHandler(async (req, res) => {
  try {
    const files = await File.find({ user: req.user._id });
    res
      .status(200)
      .json(new ApiResponse(200, files, "file fetched successfully."));
  } catch (error) {
    throw new ApiError(500, error.message || "An error occurred.");
  }
});
export const deleteResource = asyncHandler(async (req, res) => {
  const { fileId } = req.params;

  if (!fileId) {
    throw new ApiError(400, "File ID is required.");
  }

  try {
    const file = await File.findById(fileId).populate(
      "user",
      "username email fullName"
    );

    if (!file) {
      throw new ApiError(404, "File not found.");
    }

    if (req.user.username != file.user.username) {
      throw new ApiError(405, "Not Authorised");
    }

    await deleteFromCloudinary(file.fileUrl).then(async () => {
      await File.findByIdAndDelete(fileId);
    });

    res
      .status(200)
      .json(new ApiResponse(200, {}, "Resource deleted successfully."));
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "An error occurred while deleting the resource."
    );
  }
});
