import {Outlet} from "react-router-dom"
import Navbar from "../Layout/NavBar";

const MainLayout = () => (
  <>
    <Navbar />
    <div className="container mt-4">
      <Outlet />
    </div>
  </>
);


export default MainLayout;