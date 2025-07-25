import postModel from "../../model/postModel.js";

// creating post
const createPost = async (req, res) => {
  try {
    const post = await postModel.create(req.body);
    res.json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Failed to create post" });
  }
};

// reading posts
const getPosts = async (req, res) => {
  try {
    const posts = await postModel.find();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// updating post
const updatePost = async (req, res) => {
  try {
    const updated = await postModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Failed to update post" });
  }
};

// deleting post
const deletePost = async (req, res) => {
  try {
    await postModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Failed to delete post" });
  }
};

export { createPost, getPosts, updatePost, deletePost };
