import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { lazy, Suspense } from "react";
const Home = lazy(() => import("./pages/Home"));
const BlogListPage = lazy(() => import("./pages/BlogListPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));

function App() {
  return (
    <div style={{ backgroundColor: "#050816", minHeight: "100vh" }}>
      <Navbar />
      <Suspense fallback={<div style={{ backgroundColor: "#050816", minHeight: "100vh" }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;