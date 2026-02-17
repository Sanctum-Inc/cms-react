import { Briefcase, Edit2, Mail, Phone, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { LawyerResponse } from "../../api";
import {
  getStyles,
  LawyerSpecialityOptions,
} from "../Inputs/InputOptions/LawyerSpecialityOptions";
import Card from "./Card";

interface LawyerCardProps {
  lawyer: LawyerResponse;
  setShowModal: (show: boolean, lawyer: LawyerResponse) => void;
  setShowDeleteModal: (show: boolean) => void;
  setShowCasesModal: (show: boolean) => void;
}

const LawyerCard = ({
  lawyer,
  setShowModal,
  setShowDeleteModal,
}: LawyerCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/lawyer-report?id=${lawyer.id}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setShowModal(true, lawyer);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setShowDeleteModal(true);
  };

  return (
    <Card hover={true}>
      <div onClick={handleCardClick} className="cursor-pointer">
        <div className="flex">
          <div className="w-1/2">
            <div
              className={`w-14 h-14 rounded-2xl ${getStyles(lawyer.speciality.toString())} flex items-center justify-center text-white text-xl font-black shadow-lg`}
            >
              <div className="">
                {lawyer.name.at(0)}
                {lawyer.surname.at(0)}
              </div>
            </div>
          </div>
          <div className="w-1/2 flex">
            <div className="w-full justify-center flex justify-end">
              <span
                className="h-fit p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-(--color-primary) hover:cursor-pointer"
                onClick={handleEditClick}
              >
                <Edit2 size={18} />
              </span>
              <span
                className="h-fit p-2 rounded-lg text-gray-400 hover:bg-red-100 hover:text-red-500 hover:cursor-pointer"
                onClick={handleDeleteClick}
              >
                <Trash2 size={18} />
              </span>
            </div>
          </div>
        </div>

        <div className="gap-2 flex flex-col mt-5">
          <div className="text-2xl font-bold">
            {lawyer.name} {lawyer.surname}
          </div>
          <div className="text-gray-500 font-semibold">
            {
              LawyerSpecialityOptions.find(
                (option) => option.key === lawyer.speciality.toString(),
              )?.value as string
            }
          </div>
          <div className="text-gray-500 flex gap-3 text-sm mt-2">
            <Mail size={18} />
            <div>{lawyer.email}</div>
          </div>
          <div className="text-gray-500 flex gap-3 text-sm">
            <div>
              <Phone size={18} />
            </div>
            <div>{lawyer.mobileNumber}</div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-5"></div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Active Cases
            </p>
            <p className="text-2xl font-black text-slate-900">
              {lawyer.totalCases}
            </p>
          </div>
          <div className="flex -space-x-2">
            {[...Array(Math.min(lawyer.totalCases, 4))].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center"
              >
                <Briefcase className="w-3 h-3 text-slate-400" />
              </div>
            ))}
            {lawyer.totalCases > 4 && (
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white">
                +{lawyer.totalCases - 4}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LawyerCard;
