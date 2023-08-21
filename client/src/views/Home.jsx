import ColorButton from "../components/ColorButton";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <img
        className="absolute -z-50 top-0 -right-20 h-3/4 w-1/2 object-cover object-right custom-rounded-border"
        src="/bgimg.jpg"
        alt="bgimg"
      />
      {/* Navbar */}
      <Navbar />
      <div className="container ml-64 mr-64 card-width custom-glass-effect mt-24 p-10 flex flex-col gap-9">
        <div className="flex flex-col gap-2 ">
          <div className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent h-14 Mont-font">
            Blog Genius Hub
          </div>

          <div className="text-4xl text-black font-bold Mont-font">
            Now write any blog with AI.
          </div>
        </div>
        <div className="text-lg">
          Unlock a world of knowledge with AI-crafted blogs that intrigue,
          educate, and spark curiosity, all from Blog Genius Hub
        </div>
        <div className="flex gap-4">
          <ColorButton btnText="Contact Me" btnColor="primary" />
          <ColorButton btnText="Read More" btnColor="secondary" />
        </div>
      </div>
    </>
  );
}
