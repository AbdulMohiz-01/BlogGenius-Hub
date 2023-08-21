import Navbar from "../components/Navbar";
import { retrieveBlog } from "../Service/api";
import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  async function getBlogs() {
    setBlogs(await retrieveBlog());
  }

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div>
      <img
        className="absolute -z-50 top-0 -right-20 h-3/4 w-1/3 object-cover object-right custom-rounded-border"
        src="/bgimg2.jpg"
        alt="bgimg"
      />
      <Navbar />
      <div className="container ml-64 mr-64 card-width custom-glass-effect mt-24 p-10 flex flex-col gap-9">
        <div className="flex flex-col gap-2 ">
          <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent h-14 Mont-font">
            See all your blogs in one place
          </div>
          <div className="text-3xl text-black font-bold Mont-font">
            Discover Diverse Topics
          </div>
        </div>
        <div className="text-lg">
          Explore a wide range of topics and interests through your diverse
          collection
        </div>
      </div>

      <div className="container w-full m-6 mt-24 grid gap-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
        {blogs.map((blog, index) => (
          <BlogCard key={index} title={blog.title} blog={blog.blog} />
        ))}
      </div>
    </div>
  );
}
