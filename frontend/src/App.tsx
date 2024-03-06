import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { tools } from "./data/constants";
import Home from "./pages/Home";
import Code from "./pages/Code";
import Video from "./pages/Video";
import Music from "./pages/Music";
import Image from "./pages/Image";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home tools={tools} />} />
          <Route path="/code-generate" element={<Code />} />
          <Route path="/video-generate" element={<Video />} />
          <Route path="/music-generate" element={<Music />} />
          <Route path="/image-generate" element={<Image />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
