import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../api/auth";
import Button from "../../components/common/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      setError("Email zaruri hai");
      return;
    }
    try {
      setIsLoading(true);
      setError("");
      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError("Email send karne mein error aya, dobara try karo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">DataAI</h1>
          <p className="text-gray-500 mt-1">Password reset karo</p>
        </div>

        {/* Success Message */}
        {success ? (
          <div className="text-center">
            <span className="text-5xl">📧</span>
            <p className="text-green-600 font-medium mt-3">
              Reset link bhej diya gaya!
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Apni email check karo aur reset link pe click karo
            </p>
            <Link
              to="/login"
              className="mt-4 inline-block text-blue-600 hover:underline text-sm"
            >
              Login page pe wapis jao
            </Link>
          </div>
        ) : (
          <>
            {/* Error */}
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            {/* Form */}
            <div className="flex flex-col gap-4">
              <p className="text-gray-500 text-sm">
                Apni email daalo, hum aapko password reset link bhejenge
              </p>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <Button
                label="Reset Link Bhejo"
                onClick={handleSubmit}
                isLoading={isLoading}
                fullWidth
              />
            </div>

            {/* Back to Login */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Yaad aa gaya?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Login karo
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
