import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

const SingleBlog = function () {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(
    function () {
      async function fetchSingleBlog() {
        try {
          const response = await axios.get(
            `https://blog-backend-1-kq0j.onrender.com/api/v1/blogs/${id}`
          );
          setBlog(response.data);
          console.log(response.data);
        } catch (error) {
          toast("error");
        } finally {
          setIsLoading(false);
        }
      }
      fetchSingleBlog();
    },
    [id]
  );

  async function deleteBlog(id) {
    try {
      await axios.delete(
        `https://blog-backend-1-kq0j.onrender.com/api/v1/blogs/${id}`
      );
      navigate("/blogs");
      toast("Blog deleted successfully");
    } catch (error) {
      toast("error in deleting blog");
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }
  if (!blog) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Blog Not Found
        </h1>
        <Link
          to={"/blogs"}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Back to all Blogs
        </Link>
      </div>
    );
  }

  const { author, content, createdAt, tags, title, _id } = blog;

  return (
    <main>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* header */}
          <div className="mb-8 ">
            <Link
              to={"/blogs"}
              className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-1"
            >
              <ArrowLeft />
              Back to All Blogs
            </Link>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
            <div className="flex justify-between items-center text-gray-600 mb-6">
              <div>
                <span>By {author}</span>
                <span>.</span>
                <span>{createdAt}</span>
              </div>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                onClick={() => {
                  deleteBlog(_id);
                }}
              >
                Delete Blog
              </button>
            </div>
            {/* tags */}
            {tags && tags.length > 0 && (
              <div className="mb-6">
                {tags.map(function (tag, index) {
                  return (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2"
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            )}
            {/* content */}
            <div className="prose max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                {content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleBlog;
