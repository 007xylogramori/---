import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  uploadResource,
  getResources,
  deleteResource
} from "../controllers/file.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", verifyJWT, upload.single("file"), uploadResource);
router.get('/', verifyJWT, getResources);
router.delete('/:fileId', verifyJWT, deleteResource);

export default router;
