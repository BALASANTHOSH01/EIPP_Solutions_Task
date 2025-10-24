import { createBrowserRouter } from "react-router-dom";
import UserList from "../pages/UserList";
import RegistrationForm from "../pages/RegisterPage";
import EditPage from "../pages/EditPage";
import ViewPage from "../pages/ViewPage";
import NotFound from "../components/Reusable/NotFound";
import MainLayout from "../components/Layout/MainLayout"


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <UserList /> },
      { path: "/register", element: <RegistrationForm /> },
      { path: "/edit/:id", element: <EditPage /> },
      { path: "/view/:id", element: <ViewPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;