import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Task3.css";
import Navbar from "../Navbar/Navbar";

const Task3 = () => {
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "" });

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/get");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:3000/user/update/${editingId}`,
          formData
        );
        setEditingId(null);
      } else {
        await axios.post("http://localhost:3000/user/create", {
          ...formData,
        });
      }
      setFormData({ title: "", content: "" });
      fetchPosts();
    } catch (err) {
      console.error("Error submitting post", err);
    }
  };

  const handleEdit = (post) => {
    setFormData({ title: post.title, content: post.content });
    setEditingId(post._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/user/delete/${id}`);
      fetchPosts();
    } catch (err) {
      console.error("Error deleting post", err);
    }
  };

  return (
    <div className="tk-main-container">
      <Navbar />
      <div className="task3-container">
        <h2>{editingId ? "Update Post" : "Create New Post"}</h2>
        <form className="task3-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="content"
            placeholder="Content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
          <button className="task-post1" type="submit">
            {editingId ? "Update" : "Create"} Post
          </button>
        </form>

        <h2>All Posts</h2>
        {posts.map((post) => (
          <div className="task3-post" key={post._id}>
            <h3 className="task3-h3">{post.title}</h3>
            <p className="task3-p">{post.content}</p>
            <small className="task3-sml">by: {post.userId?.email}</small>
            <div>
              <button className="task3-edit" onClick={() => handleEdit(post)}>
                Edit
              </button>
              <button
                className="task3-delete"
                onClick={() => handleDelete(post._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task3;
