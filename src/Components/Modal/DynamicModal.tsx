import type { ReactNode } from "react";
import Card from "../Cards/Card";

interface DynamicModalProps {
  children: ReactNode;
  title:string;
}

const DynamicModal = ({ children, title }: DynamicModalProps) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
      <Card className="z-50 h-1/6 w-2/6 px-8 bg-white">
        <div className="text-3xl text-(--color-primary) font-bold">{title}</div>

        <div className="mt-6 text-lg">
          Are you sure you want to delete this item?
        </div>

        <div className="mt-6">{children}</div>
      </Card>
    </div>
  );
};

export default DynamicModal;
