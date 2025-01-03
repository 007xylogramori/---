import File from "../models/file.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.config.js";
import * as PDFJS from 'pdfjs-dist/legacy/build/pdf.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Path from "path";
import { getEmbeddings } from "../utils/gemini.config.js";


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

export const getEmbed=asyncHandler(async(req,res)=>{
  const embedding = await getEmbeddings(req.body.text);
  res.status(200).send(embedding);
})

export const processFile = asyncHandler(async (req, res) => {
  const { fileId } = req.params;

  if (!fileId) {
    throw new ApiError(400, "File ID is required.");
  }

  try {
    const file = await File.findById(fileId);
    if (!file) {
      throw new ApiError(404, "File not Found");
    }
    if (file.isProcessed == true) {
      throw new ApiError(400, "File Already Processed");
    }

    let vectors = [];
    let myFileData = await fetch(file.fileUrl);

    if (myFileData.ok) {
      let pdfDoc = await PDFJS.getDocument(await myFileData.arrayBuffer()).promise
			const numPages = pdfDoc.numPages
			for (let i = 0; i < numPages; i++) {
				let page = await pdfDoc.getPage(i + 1)
				let textContent = await page.getTextContent()
				const text = textContent.items.map(item => item.str).join('');
        console.log(text);
				// 5. Get embeddings for each page
				// const embedding = await getEmbeddings(text)

				// // 6. push to vector array
				// vectors.push({
				// 	id: `page${i + 1}`,
				// 	values: embedding,
				// 	metadata: {
				// 		pageNum: i + 1,
				// 		text,
				// 	},
				// })
			}
    }
    res.status(200).json({"nice":"nice"})
  } catch (error) {
    throw new ApiError(
      500,
      error || "An error occurred while deleting the resource."
    );
  }
});
