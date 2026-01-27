
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AuthSuccess from "./pages/AuthSuccess";

function App() {
  const token = localStorage.getItem("auth_token");

  return (
    <Routes>
      <Route
        path="/login"
        element={token ? <Navigate to="/" /> : <Login />}
      />

      <Route
        path="/auth-success"
        element={<AuthSuccess />}
      />

      <Route
        path="/"
        element={
          token ? (
            <AppLayout>
              <Dashboard />
            </AppLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;


