import {
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Mail,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../api";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import Card from "../../Components/Cards/Card";

const EmailVerifiedPage = () => {
  // We simulate a status check from the URL.
  // In a real app, you might use: const status = new URLSearchParams(window.location.search).get('status');
  const [status, setStatus] = useState<"success" | "error" | null>("success");
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;

    const queryString = hash.split("?")[1];

    const params = new URLSearchParams(queryString);
    const paramStatus = params.get("status") as "success" | "error" | null;
    const paramEmail = params.get("email");

    setStatus(paramStatus);
    setEmail(paramEmail);
  }, []);

  const handleResendEmail = () => {
    UserService.resendConfirmEmail(email ?? "")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      {status === "success" ? (
        /* SUCCESS STATE */
        <Card className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-100 animate-in fade-in zoom-in duration-500">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Email Verified!
          </h1>
          <p className="text-slate-600 mb-8">
            Thank you for verifying your email. Your LexCase CMS account is now
            fully active and secured.
          </p>
          <PrimaryButton onClick={() => navigate("/login")} color="gray">
            Go to Login
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </PrimaryButton>
        </Card>
      ) : (
        /* FAILURE STATE */
        <Card className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-100 animate-in fade-in zoom-in duration-500">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Verification Failed
          </h1>
          <p className="text-slate-600 mb-6">
            This verification link has expired or is invalid. Security tokens
            usually expire after 24 hours.
          </p>

          <div className="space-y-3">
            <PrimaryButton onClick={() => handleResendEmail()} icon={Mail}>
              Resend Verification Email
            </PrimaryButton>

            <PrimaryButton
              onClick={() => (window.location.href = "/support")}
              color="lightGray"
              icon={HelpCircle}
            >
              Contact Support
            </PrimaryButton>
          </div>

          <p className="mt-8 text-xs text-slate-400">
            Error Code: AUTH_TOKEN_EXPIRED
          </p>
        </Card>
      )}
    </div>
  );
};

export default EmailVerifiedPage;
