import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import AllBlogs from "./pages/AllBlogs";
import SingleBlog from "./pages/SingleBlog";
import AddBlog from "./pages/AddBlog";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
const App = () => (
  <BrowserRouter>
    <div className="min-h-screen bg-white-100 dark:bg-gray-700">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  </BrowserRouter>
);

export default App;
