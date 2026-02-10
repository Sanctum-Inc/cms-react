import { Copy, Download, Eye, Send, X } from "lucide-react";
import { useState, type PropsWithChildren } from "react";
import { EmailService, type AddEmailRequest } from "../../api";
import PrimaryButton from "../Buttons/PrimaryButton";
import Card from "../Cards/Card";
import PillInput from "../Inputs/PillInput";
import PillTextarea from "../Inputs/PillTextarea";
import SuccessModal from "./SuccessModal";

interface ShareFileModalProps extends PropsWithChildren {
  title: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  setShowModal: (show: boolean) => void;
}

const ShareFileModal = ({
  title,
  fileName,
  fileSize,
  fileType,
  setShowModal,
}: ShareFileModalProps) => {
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [emailRequest, setEmailRequest] = useState<AddEmailRequest>({
    to: [],
    body: "",
    subject: "",
    isHtml: false,
    attachmentIds: null,
    cc: null,
    bcc: null,
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://example.com/shared-file-link");
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleSendEmail = () => {
    setSendingEmail(true);
    // Simulate email sending
    setTimeout(() => {
      setSendingEmail(false);
      //setShowModal(false);
    }, 4000);

    EmailService.createEmail(emailRequest)
      .then((response) => {
        setSendingEmail(false);
        setShowSuccessModal(true);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <>
      {!showSuccessModal && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center 
  bg-black/40 backdrop-blur-sm"
        >
          <Card className="z-50 w-6/10 px-8 bg-white">
            <div className="flex items-center justify-between">
              <div className="text-2xl  font-bold">{title}</div>
              <div className="rounded-full p-1 cursor-pointer hover:bg-gray-200 hover:text-black-500">
                <X
                  className="cursor-pointer text-gray-500"
                  onClick={() => setShowModal(false)}
                />
              </div>
            </div>

            <div className="mt-6 text-lg bg-gray-100 p-4 rounded-md flex items-center">
              <div>
                <div className="border border-gray-300 rounded-md bg-white p-2 flex items-center justify-center mr-4">
                  <Download className="inline text-(--color-primary) hover:cursor-pointer" />
                </div>
              </div>
              <div>
                <div className="text-black text-base font-semibold">
                  {fileName}
                </div>
                <div className="text-gray-500 text-xs">
                  {fileSize} | {fileType}
                </div>
              </div>
              <div className="ml-auto">
                <Eye className="inline ml-4 mr-2 text-(--color-primary) hover:cursor-pointer" />
              </div>
            </div>

            <div className="mt-6">
              <PillInput
                label="Recipient Email"
                placeholder="Add email address and press Enter"
                value={emailInput}
                values={emailRequest.to}
                addEnterHint
                onChange={(e) => setEmailInput(e.target.value)}
                onAdd={(email) => {
                  if (emailRequest.to.includes(email)) return;

                  setEmailRequest((prev) => ({
                    ...prev,
                    to: [...prev.to, email],
                  }));

                  setEmailInput(""); // ✅ CLEAR INPUT
                }}
                onRemove={(index) =>
                  setEmailRequest((prev) => ({
                    ...prev,
                    to: prev.to.filter((_, i) => i !== index),
                  }))
                }
              />

              <PillInput
                label="Subject"
                name="subject"
                type="text"
                placeholder="Enter email subject"
                value={emailRequest.subject || ""}
                onChange={(e) =>
                  setEmailRequest({
                    ...emailRequest,
                    subject: e.target.value,
                  })
                }
              ></PillInput>
              <PillTextarea
                label="Personal Message"
                name="personalMessage"
                rows={3}
                placeholder="Hi there, please find the attached file."
                value={emailRequest.body}
                onChange={(e) =>
                  setEmailRequest({
                    ...emailRequest,
                    body: e.target.value,
                  })
                }
              ></PillTextarea>
            </div>
            <div className="flex mt-4 items-center">
              <div className="w-1/2 mr-2 ">
                <PrimaryButton
                  icon={Copy}
                  color="lightGray"
                  onClick={handleCopyLink}
                >
                  {linkCopied ? "Link Copied!" : "Copy Link"}
                </PrimaryButton>
              </div>
              <div className="w-1/2 ml-2">
                <PrimaryButton
                  icon={Send}
                  onClick={handleSendEmail}
                  loading={sendingEmail}
                >
                  Send Email
                </PrimaryButton>
              </div>
            </div>
          </Card>
        </div>
      )}
      {showSuccessModal && (
        <SuccessModal
          title="Email Sent Successfully"
          setShowModal={setShowSuccessModal}
          subititle="The file has been successfully shared via email.
"
        ></SuccessModal>
      )}
    </>
  );
};

export default ShareFileModal;
