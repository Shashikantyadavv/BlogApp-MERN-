import React, { useContext, useEffect } from "react";
import { GlobalContext } from "./Context";
import { useNavigate, useParams } from "react-router-dom";

const AddBlog = () => {
  const { formData, setFormData, addBlog, updateBlog, blogList } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      if (id) {
        await updateBlog(formData,id);
      } else {
        await addBlog(formData);
      }
      navigate("/"); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (id) {
      const blog = blogList.find((blog) => blog._id === id);
      if (blog) {
        setFormData({
          title: blog.title,
          description: blog.description,
        });
      }
    }
  }, [id, blogList, setFormData]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-700">
          {id ? "Edit Blog" : "Add Blog"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter Title..."
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <textarea
              placeholder="Enter Description..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows="5"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 rounded-md focus:outline-none"
            >
              <i className="fa fa-plus mr-2" aria-hidden="true"></i>
              {id ? "Edit Blog" : "Add Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
