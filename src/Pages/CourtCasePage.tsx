import { Plus } from "lucide-react";
import PrimaryButton from "../Components/Buttons/PrimaryButton";

const CourtCasePage = () => {
    return (
        <>
            <div className='flex justify-between border-b-solid border-b-2 border-solid border-gray-300 py-5 px-3 bg-white'>
                <span className='text-3xl text-black font-bold'>Case Management</span>
                <span className='text-lg text-gray-400 font-bold'>
                    <PrimaryButton onClick={() => {}}>
                        <div className="flex">
                            <span className="m-auto"><Plus className="pr-1" /></span> 
                            Add New Case
                        </div>
                    </PrimaryButton>
                </span>
            </div>
            <div className="p-3">
            <table className="w-full mt-6 bg-white rounded-2xl">
                <thead className="bg-gray-100 mb-3">
                    <tr>
                        <th className="text-left p-4">Case Number</th>
                        <th className="text-left p-4">Title</th>
                        <th className="text-left p-4">Client</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Assigned Lawyer</th>
                        <th className="text-left p-4">Next Hearing Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b hover:bg-(--color-hover-light) cursor-pointer">
                        <td className="p-4">2023-001</td>
                        <td className="p-4">Smith vs. Johnson</td>
                        <td className="p-4">Michael Smith</td>
                        <td className="p-4">Open</td>
                        <td className="p-4">Sarah Lee</td>
                        <td className="p-4">12/15/2024</td>
                    </tr>
                    <tr className="border-b hover:bg-(--color-hover-light) cursor-pointer">
                        <td className="p-4">2023-002</td>
                        <td className="p-4">Davis vs. Brown</td>
                        <td className="p-4">Emily Davis</td>
                        <td className="p-4">Closed</td>
                        <td className="p-4">James Wilson</td>
                        <td className="p-4">N/A</td>
                    </tr>
                    <tr className="border-b hover:bg-(--color-hover-light) cursor-pointer">
                        <td className="p-4">2023-003</td>
                        <td className="p-4">Garcia vs. Martinez</td>
                        <td className="p-4">Carlos Garcia</td>
                        <td className="p-4">In Progress</td>
                        <td className="p-4">Linda Thompson</td>
                        <td className="p-4">01/10/2025</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </>
    );
}

export default CourtCasePage;