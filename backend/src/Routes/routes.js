import express from "express";
import user, { userLogin } from "../Controller/web/create/user.js";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} from "../Controller/Task3/postController.js";
const route = express.Router();

route.post("/sign", user);
route.post("/login", userLogin);

// task 3
route.post("/create", createPost);
route.get("/get", getPosts);
route.put("/update/:id", updatePost);
route.delete("/delete/:id", deletePost);

export default route;
