import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home/Home";
import Details from "./page/Details/Details";
import Register from "./page/Auth/Register";
import Login from "./page/Auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./page/Auth/Profile";
import Order from "./page/Dashboard/Order";
import Dashboard from "./page/Dashboard/Dashboard";
import Reviews from "./page/Dashboard/Reviews";
import RequireAdmin from "./hooks/RequireAdmin";
import User from "./page/Dashboard/Admin/User";
import AdminOrder from "./page/Dashboard/Admin/AdminOrder";
import AdmnReview from "./page/Dashboard/Admin/AdmnReview";
import Products from "./page/Dashboard/Admin/Products";
import ProductsView from "./page/Projucts/ProductsView";
import RequireAuth from "./hooks/RequireAuth";
import Footer from "./components/Footer/Footer";
import About from "./page/Blog/About";
import Blog from "./page/Blog/Blog";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/products" element={<ProductsView />} />
        <Route path="/product/:id" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>}>
          <Route path="order" element={<RequireAuth><Order /></RequireAuth>} />
          <Route path="review" element={<RequireAuth><Reviews /></RequireAuth>} />

          <Route
            path="admin/user"
            element={
              <RequireAdmin>
                <User />
              </RequireAdmin>
            }
          />
          <Route
            path="admin/order"
            element={
              <RequireAdmin>
                <AdminOrder />
              </RequireAdmin>
            }
          />
          <Route
            path="admin/review"
            element={
              <RequireAdmin>
                <AdmnReview />
              </RequireAdmin>
            }
          />
          <Route
            path="admin/products"
            element={
              <RequireAdmin>
                <Products />
              </RequireAdmin>
            }
          />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
