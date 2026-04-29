// import { useEffect, useState } from "react";
import { useCallback, useState } from "react";
import { isUser } from "./context/auth-context.jsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import NotFound from "./pages/404/NotFound.jsx";
import Menu from "./pages/menu/menu.jsx";
import Register from "./pages/connexion/register/register.jsx";
import Login from "./pages/connexion/login/login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <Menu /> },
      {
        path: "menu",
        element: <Menu />,
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

const routerConnectee = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <Menu /> },
      {
        path: "menu",
        element: <Menu />,
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((userId, token) => {
    setToken(token);
    setUserId(userId);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  return (
    <isUser.Provider
      value={{
        connectee: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <RouterProvider router={token ? routerConnectee : router} />
    </isUser.Provider>
  );
};

export default App;
