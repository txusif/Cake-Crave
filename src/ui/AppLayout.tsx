import { Outlet } from "react-router-dom";
import Developer from "./Developer";
import Container from "./Container";
import PositionFixed from "./PositionFixed";
import Navbar from "@/features/Navbar/Navbar";
import Cart from "@/features/Cart/Cart";

export default function AppLayout() {
  return (
    <Container>
      <div className="h-screen overflow-hidden overflow-y-auto pb-[40px] shadow-lg">
        <PositionFixed>
          <Navbar />
          <Cart />
        </PositionFixed>
        <Outlet />
      </div>
      <Developer />
    </Container>
  );
}
