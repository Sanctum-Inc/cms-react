import {
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Mail,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import Card from "../Components/Cards/Card";

const EmailVerified = () => {
  // We simulate a status check from the URL.
  // In a real app, you might use: const status = new URLSearchParams(window.location.search).get('status');
  const [status, setStatus] = useState<"success" | "error" | null>("success");
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;

    const queryString = hash.split("?")[1];

    const params = new URLSearchParams(queryString);
    const result = params.get("status") as "success" | "error" | null;

    console.log(result);
    setStatus(result);
  }, []);

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
            <button
              onClick={() => (window.location.href = "/resend-verification")}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Resend Verification Email
            </button>

            <button
              onClick={() => (window.location.href = "/support")}
              className="w-full py-3 px-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              Contact Support
            </button>
          </div>

          <p className="mt-8 text-xs text-slate-400">
            Error Code: AUTH_TOKEN_EXPIRED
          </p>
        </Card>
      )}
    </div>
  );
};

export default EmailVerified;
