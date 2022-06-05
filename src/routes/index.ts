import { Router, Request, Response, NextFunction } from "express";
const router = Router();
import User from "../models/User";
import upload from "../libs/multer";
import {
  getPhotos,
  createPhoto,
  deletePhoto,
  getPhoto,
  updatePhoto,
  signup,
  signin,
  verifyToken,
  resetPassword,
  forgotPassword,
  confirmSign,
} from "../controllers/photo.controller";


router.route("/forgot").post(forgotPassword);

router.route("/reset").post(resetPassword);

router.route("/confirm").post(confirmSign);

// routes
// middleware
// router.use(upload.single('image'));
router
  .route("/photos")
  // .get(getPhotos)
  //sigle es para especifiacar que se subira un archivo a la vez de tipo image
  .post(upload.single("image"), createPhoto);

router.route("/photos").get(getPhotos),
  verifyToken,
  (req: Request, res: Response) => {};

router.route("/photos/:id").get(getPhoto).delete(deletePhoto).put(updatePhoto);

router.route("/signup").post(signup);

router.route("/signin").post(signin);



export default router;
