import { ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import Card from "../../Components/Cards/Card";
import PillInput from "../../Components/Inputs/PillInput";
import { ValidateField } from "../../Utils/InputValidator";
import { UserService, type ForgotPasswordRequest } from "../../api";
import logo from "../../assets/logo-white.png";

const ForgotPasswordPage = () => {
  const [emailRequest, setEmail] = useState<ForgotPasswordRequest>({
    email: "",
  });
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail({
      email: value,
    });

    // Clear error immediately when user starts typing (if field was touched)
    if (touched) {
      const validationError = ValidateField("email", value);
      setError(validationError);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTouched(true);

    const validationError = ValidateField("email", value);
    setError(validationError);
  };

  const handleSubmit = async () => {
    const trimmedEmail = emailRequest.email.trim();
    setEmail({
      email: trimmedEmail,
    });

    // Mark field as touched
    setTouched(true);

    // Validate email field
    const emailError = ValidateField("email", trimmedEmail);
    setError(emailError);

    if (emailError) return;

    setIsSubmitting(true);

    try {
      UserService.forgotPassword(emailRequest)
        .then(() => {
          console.log("Password reset email sent successfully.");
        })
        .catch((err) => {
          console.log(err);
        });
      // // Show success message
      // setIsSuccess(true);
      // setError("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorData = error.body || error.response?.data || error;
      const statusCode =
        errorData.status || error.status || error.response?.status;

      if (statusCode === 404) {
        setError("No account found with this email address");
      } else {
        setError(
          "Failed to send password reset email. Please try again later.",
        );
      }
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-sm border border-gray-200 p-6 rounded-xl shadow-md flex flex-col items-center bg-white">
        <div className="w-32 mb-6">
          <img
            src={logo}
            alt="logo"
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {!isSuccess ? (
          <>
            <div className="w-full mb-6">
              <h2 className="text-2xl font-semibold text-center mb-2">
                Forgot Password?
              </h2>
              <p className="text-gray-600 text-center text-sm">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
            </div>

            <div className="w-full">
              <PillInput
                placeholder="Email Address"
                type="email"
                label="Email"
                name="email"
                value={emailRequest.email}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
              />
              {touched && error && (
                <p className="text-red-600 text-sm mt-1 ml-3.5">{error}</p>
              )}
            </div>

            <div className="w-full flex justify-end mt-5">
              <div className="w-8/8 flex justify-end">
                <PrimaryButton onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </PrimaryButton>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full mb-6">
            <div className="flex flex-col items-center justify-center">
              <div className="bg-green-100 rounded-full p-3 mb-4">
                <Mail className="text-green-600 w-8 h-8" />
              </div>
              <h2 className="text-2xl font-semibold text-center mb-2">
                Check Your Email
              </h2>
              <p className="text-gray-600 text-center text-sm mb-4">
                We've sent a password reset link to{" "}
                <strong>{emailRequest.email}</strong>
              </p>
              <p className="text-gray-500 text-center text-xs">
                Didn't receive the email? Check your spam folder or try again.
              </p>
            </div>
          </div>
        )}

        <div className="mt-5">
          <Link
            to="/login"
            className="text-(--color-primary) hover:underline flex items-center align-center justify-center gap-1 cursor-pointer"
          >
            <span>
              <ArrowLeft />
            </span>
            <span>Back to Login</span>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
