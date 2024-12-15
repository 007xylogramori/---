import mongoose from "mongoose";

const Schema = mongoose.Schema;

const file = new Schema(
  {
    fileName: {
      type: String,
      required: [true, "Filename is a required field."],
      trim: true,
      lowercase: true,
      maxLength: 100,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileUrl: {
      type: String,
      required: [true, "File Url is a required field."],
      trim: true,
      maxLength: 100,
      unique: true
    },
    fileType:{
      type: String,
      enum: [".pdf", ".docx", ".doc"],
      required: [true, "File Type is required "]
    },
    isProcessed: {
      type: Boolean,
      default: false,
    },
    vectorIndex: {
      type: String,
      maxLength: 100,
      unique: true,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.models.myFile || mongoose.model("myFile", file);

export default File;
