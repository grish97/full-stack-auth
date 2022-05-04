import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Route types
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import PrivateRoutes from "./PrivateRoutes";

import { Auth, Dashboard, Unknown } from "application/components";

export default function Routing() {
  const isAuthenticated = false;

  return (
    <BrowserRouter>
      <Routes>
        {/** Public routes */}
        <Route
          path="/auth"
          element={<PublicRoutes isAuthenticated={isAuthenticated} />}
        >
          <Route path="login" element={<Auth.Login />} />
          <Route path="register" element={<Auth.Register />} />
        </Route>

        {/** Private routes */}
        <Route
          path="/"
          element={<PrivateRoutes isAuthenticated={isAuthenticated} />}
        >
          <Route path="" element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/** Unknown routes */}
        <Route path="*" element={<Unknown />} />
      </Routes>
    </BrowserRouter>
  );
}