import { createContext, useState } from "react";
import axios from "axios";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      const result = res.data;
      setBlogList(result.blogList);
    } catch (error) {
      console.error("Error fetching blog list", error);
    } finally {
      setLoading(false);
    }
  };

  const addBlog = async (data) => {
    try {
      await axios.post(`http://localhost:5000/api/blogs/add`, data);
      setFormData({
        title: "",
        description: "",
      });
    } catch (err) {
      console.error("Error adding blog", err);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/blogs/delete/${id}`
      );
      return res.data;
    } catch (error) {
      console.error("Error deleting blog", error);
      return null;
    }
  };
  const updateBlog = async (data,id) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/blogs/update/${id}`, data);
      setFormData({
        title: "",
        description: "",
      });
    } catch (error) {
      console.error("Error in Updating blog", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        blogList,
        setBlogList,
        loading,
        setLoading,
        formData,
        setFormData,
        updateBlog,
        deleteBlog,
        fetchBlog,
        addBlog,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
