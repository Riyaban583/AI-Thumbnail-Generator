import express from "express";
import {
  getThumbnailbyId,
  getUserThumbnails,
} from "../controllers/UserController";
import protect from "../middlewares/auth";

const UserRouter = express.Router();

UserRouter.get("/thumbnails", protect, getUserThumbnails);
UserRouter.get("/thumbnail/:id", protect, getThumbnailbyId);

export default UserRouter;
