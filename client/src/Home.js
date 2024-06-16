import React, { useContext, useEffect } from "react";
import { GlobalContext } from "./Context";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { blogList, loading, deleteBlog, fetchBlog } =
    useContext(GlobalContext);

  const fetchListOfBlogs = async () => {
    await fetchBlog();
  };

  const handleDelete = async (id) => {
    const message = await deleteBlog(id);
    if (message) {
      fetchListOfBlogs();
    }
  };

  const navigate = useNavigate();
  const handleUpdate = async (id) => {
    navigate(`/addblog/${id}`);
  };
  useEffect(() => {
    fetchListOfBlogs();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {loading ? (
        <h1 className="text-2xl font-semibold text-center text-gray-700">
          Loading...
        </h1>
      ) : (
        <ul className="space-y-6">
          {blogList.map((blog, index) => (
            <li
              key={index}
              className="p-6 bg-white rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {blog.title}
                </h2>
                <p className="mt-2 text-gray-700">{blog.description}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleUpdate(blog._id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
