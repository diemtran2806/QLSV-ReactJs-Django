import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import FacultyPage from "./pages/Faculty";
import StudentPage from "./pages/Student";
import LoginPage from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "faculty",
        element: <FacultyPage  admin={false}/>,
      },
      {
        path: "class",
        element: <HomePage/>,
      },
      {
        path: "student",
        element: <StudentPage admin={true}/>,
      },
      {
        path: "lecture",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
