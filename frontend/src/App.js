import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import FacultyPage from "./pages/Faculty";
import StudentPage from "./pages/Student";
import ClassPage from "./pages/Class";
import LoginPage from "./pages/Login";
import LecturerPage from "./pages/Lecturer";
import MyProfile from "./pages/MyProfile";
import ChangePassword from "./pages/ChangePassword";
import AdminPage from "./pages/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "faculty",
        element: <FacultyPage admin={true} />,
      },
      {
        path: "class",
        element: <ClassPage />,
      },
      {
        path: "student",
        element: <StudentPage admin={true} />,
      },
      {
        path: "student/class/:idClass",
        element: <StudentPage admin={true} />,
      },
      {
        path: "lecture",
        element: <LecturerPage admin={true} />,
      },
      {
        path: "admin",
        element: <AdminPage admin={true} />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "myProfile",
        element: <MyProfile />,
      },
      {
        path: "changePassword",
        element: <ChangePassword />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
