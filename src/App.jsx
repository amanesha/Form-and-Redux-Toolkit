import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import Home from "./components/RegistrationForm/Home";
import SuccessForm from "./components/RegistrationForm/SuccessForm";
import Error from "./components/RegistrationForm/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
    },

    { path: "/register", element: <RegistrationForm /> },
    { path: "/success", element: <SuccessForm /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
