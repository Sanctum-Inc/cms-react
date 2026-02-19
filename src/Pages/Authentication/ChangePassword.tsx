import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserService } from "../../api";
import logo from "../../assets/logo-white.png";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import Card from "../../Components/Cards/Card";
import PillInput from "../../Components/Inputs/PillInput";
import { ValidateField } from "../../Utils/InputValidator";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Extract token and email from URL (sent via the email link)
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (touched[name]) {
      const error = ValidateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = ValidateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleResetPassword = async () => {
    // Mark all as touched
    setTouched({ password: true, confirmPassword: true });

    // Validations
    const passwordError = ValidateField("password", form.password);
    let confirmError = ValidateField("password", form.confirmPassword);

    if (!confirmError && form.password !== form.confirmPassword) {
      confirmError = "Passwords do not match";
    }

    setErrors({
      password: passwordError,
      confirmPassword: confirmError,
    });

    if (passwordError || confirmError) return;

    try {
      setIsSubmitting(true);
      UserService.changePassword({
        password: form.password,
        token: token,
      })
        .then(() => {
          console.log("Password reset successfully.");
          navigate("/login?changePasswordSuccess=true");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error: any) {
      const errorData = error.body || error.response?.data || error;
      setErrors({
        password:
          errorData.detail || "Reset failed. The link may have expired.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleResetPassword();
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

        <h2 className="text-xl font-bold text-dark mb-2">Reset Password</h2>
        <p className="text-gray-500 text-sm mb-6 text-center">
          Please enter your new password below.
        </p>

        <div className="w-full">
          <PillInput
            placeholder="New Password"
            type="password"
            label="New Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
          />
          {touched.password && errors.password && (
            <p className="text-red-600 text-sm mb-2 ml-3.5">
              {errors.password}
            </p>
          )}
        </div>

        <div className="w-full">
          <PillInput
            placeholder="Confirm New Password"
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="text-red-600 text-sm ml-3.5">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="w-full flex justify-end mt-8">
          <PrimaryButton onClick={handleResetPassword} disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Password"}
          </PrimaryButton>
        </div>

        <div className="mt-6">
          <button
            onClick={() => navigate("/login")}
            className="text-(--color-primary) hover:underline flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Back to Login</span>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ChangePassword;
