import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { lazy } from "react";
import { Toaster } from "react-hot-toast";

const AppLayout = lazy(() => import("./layout/AppLayout"));
const Products = lazy(() => import("./pages/Products"));
const AuthOnly = lazy(() => import("./pages/AuthPages/AuthOnly"));
const Shops = lazy(() => import("./pages/Shops"));
const Protected = lazy(() => import("./pages/AuthPages/Protected"));
const SignIn = lazy(() => import("./pages/AuthPages/SignIn"));
const SignUp = lazy(() => import("./pages/AuthPages/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route element={<AuthOnly />}>
            <Route path="/signin" element={<SignIn />} />
          </Route>
          <Route element={<Protected />}>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Shops />} />
              <Route path="/products" element={<Products />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <ScrollToTop />
      </Router>
    </>
  );
}
