import Home from "./views/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blogs from "./views/Blogs";
import Write from "./views/Write";
import { Suspense } from "react";
import Loading from "./components/Loading";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/write" element={<Write />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
