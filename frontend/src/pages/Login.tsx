
function Login() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Sign in to Email Scheduler
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Use your Google account to continue
        </p>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          <img
            src="/google.png"
            alt="Google"
            className="w-4 h-4"
          />

          <span className="text-sm font-medium text-gray-700">
            Continue with Google
          </span>
        </button>
      </div>
    </div>
  );
}

export default Login;
