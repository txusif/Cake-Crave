import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cake from "./pages/Cake";
import Search from "./pages/Search";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import { Authentication } from "./pages/Authentication";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  return (
    <BrowserRouter>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <Routes>
        {/* <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        > */}
        <Route path="/" element={<Navigate replace to={"/cakes"} />} />
        <Route path="/cakes" index element={<Home />} />
        <Route path="/cakes/:cakeId" element={<Cake />} />
        <Route path="/search" element={<Search />} />
        <Route path="/order" element={<Order />} />
        {/* <Route path="/order/:orderId" element={<OrderDetails />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
        {/* </Route> */}
        <Route path="/login" element={<Authentication />} />
        {/* <Route path="/sign-up" element={<SignUp />} /> */}
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
