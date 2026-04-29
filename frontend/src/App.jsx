// import { useEffect, useState } from "react";
import { useCallback, useContext, useState } from "react";
import { Auth } from "./context/auth-context.jsx";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import NotFound from "./pages/404/NotFound.jsx";
import Menu from "./pages/menu/menu.jsx";
import Register from "./pages/connexion/register/register.jsx";
import Login from "./pages/connexion/login/login.jsx";
import Build from "./pages/build/build.jsx";
import ListUsers from "./pages/admin/listUsers.jsx";

const AdminRoute = ({ children }) => {
  const admin = useContext(Auth);
  if (!admin.role) return <Navigate to="/menu" />;
  return children;
};

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
      { path: "build", element: <Build /> },
      {
        path: "banUser",
        element: (
          <AdminRoute>
            <ListUsers />
          </AdminRoute>
        ),
      },
    ],
  },
]);

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [role, setRole] = useState(false);

  const login = useCallback((userId, token, role) => {
    setToken(token);
    setUserId(userId);
    setRole(role);
  }, []);

  const logout = useCallback(() => {
    setToken(false);
    setUserId(false);
    setRole(false);
  }, []);

  return (
    <Auth.Provider
      value={{
        connectee: !!token,
        token: token,
        userId: userId,
        role: role === "admin",
        login: login,
        logout: logout,
      }}
    >
      <RouterProvider router={router} />
    </Auth.Provider>
  );
};

export default App;
