import TypingEffect from "../components/TypingEffect";
import { SendHorizontal, Wand } from "lucide-react";
import { generateBlog } from "../Service/api";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Write() {
  const [title, setTitle] = useState("");
  const [rblog, setrBlog] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typedContent, setTypedContent] = useState("");

  const typingPhrases = [
    "Title to Blog Magic",
    1000,
    "Your Title, Our Blog",
    1000,
    "Spark Ideas, We Write",
    1000,
    "Create with Titles",
    1000,
    "Blogs from Titles",
    1000,
    "Title-Driven Blogs",
    1000,
    "Your Title, Our Words",
    1000,
    "Title Transformed: Blogs",
    1000,
    "Turn Titles into Blogs",
    1000,
    "Titles Shape Blogs",
    1000,
  ];
  const handleGenerateBlog = async () => {
    try {
      const { content } = await generateBlog(title); // Call the generateBlog function
      console.log(content);

      setrBlog(content);

      setTypedContent(""); // Clear previously typed content
      setIsTyping(true); // Start typing animation

      for (let i = 0; i < content.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1)); // Delay for each character
        setTypedContent((prevContent) => prevContent + content[i]); // Append character to typed content
      }

      setIsTyping(false); // Finish typing animation
    } catch (error) {
      console.error("Error generating blog:", error);
    }
  };

  return (
    <>
      <img
        className="absolute -z-50 top-0 -right-20 h-3/4 w-1/2 object-cover object-right custom-rounded-border"
        src="/bgimg.jpg"
        alt="bgimg"
      />
      <Navbar />
      <section
        id="prompt"
        className="container ml-64 mr-64 mt-8 mb-96 flex flex-col gap-6 result-card-width custom-glass-effect p-10"
      >
        <div className="relative flex flex-row justify-between">
          <TypingEffect
            phrases={typingPhrases}
            speed={50}
            style={{
              fontSize: "2em",
              display: "inline-block",
              fontWeight: "bold",
              fontFamily: "Cascadia Mono",
              color: "purple",
            }}
            repeat={Infinity}
          />
          <h1 className="text-4xl font-bold relative bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text h-12">
            <span className="flex items-center">
              <Wand
                color="rgba(219, 39, 119, 0.8)"
                size={34}
                className="mr-2"
              />
              Write your blog
            </span>
          </h1>
        </div>
        {/* Results */}
        <div className="flex flex-col gap-12">
          <div
            id="results"
            className="flex flex-col gap-5 h-96 min-h-96 border border-purple-500 bg-white rounded-lg p-6 overflow-auto"
          >
            <div className="text-2xl font-semibold text-purple-600">
              {title || "Your title will appear here"}
            </div>
            <div className="text-lg text-gray-700 leading-relaxed">
              {isTyping ? typedContent : rblog || "Your blog will appear here"}
            </div>
          </div>
        </div>

        {/* End of Results */}

        <div className="relative">
          <div className="flex">
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your title here"
              className="border-2 border-purple-400 rounded-lg p-3 w-full focus:outline-none focus:border-purple-500 transition duration-300 pr-12" // Added pr-12 to make space for the button
              style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
            />

            <div className="absolute right-2 top-0 h-full flex justify-center items-center">
              <button
                id="send-icon"
                className="flex justify-center items-center rounded-md bg-gradient-to-r from-purple-300 to-purple-400 hover:from-purple-400 hover:to-purple-500 p-1 transition-all duration-300"
                onClick={handleGenerateBlog} // Trigger the generateBlog function
                disabled={!title.trim()} // Disable the button when title is empty or only contains whitespace
                style={{
                  cursor: title.trim() ? "pointer" : "not-allowed", // Change cursor when disabled
                }}
              >
                <SendHorizontal color="white" size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
