import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const AppLayout = lazy(() => import("./layout/AppLayout"));
const Products = lazy(() => import("./pages/Products"));
const Shops = lazy(() => import("./pages/Shops"));
const TrashProducts = lazy(() => import("./pages/TrashProducts"));
const Protected = lazy(() => import("./pages/AuthPages/Protected"));
const UserProfiles = lazy(() => import("./pages/UserProfiles"));
const SignIn = lazy(() => import("./pages/AuthPages/SignIn"));
const SignUp = lazy(() => import("./pages/AuthPages/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route
            element={<Protected allowedRoles={["admin", "super-admin"]} />}
          >
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
            </Route>
          </Route> */}
          <Route element={<Protected allowedRoles={["super-admin"]} />}>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/shops" element={<Shops />} />
              <Route path="/trash/products" element={<TrashProducts />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollToTop />
      </Router>
    </>
  );
}
