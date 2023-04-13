import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import FacultyPage from "./pages/Faculty";
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
        element: <FacultyPage />,
      },
      {
        path: "class",
        element: <FacultyPage />,
      },
      {
        path: "student",
        element: <FacultyPage />,
      },
      {
        path: "lecture",
        element: <FacultyPage />,
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
