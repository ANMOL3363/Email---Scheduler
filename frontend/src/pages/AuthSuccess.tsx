
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("auth_token", token);
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600">
      Signing you in...
    </div>
  );
}

export default AuthSuccess;
