import Home from "./views/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blogs from "./views/Blogs";
import Write from "./views/Write";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/write" element={<Write />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
