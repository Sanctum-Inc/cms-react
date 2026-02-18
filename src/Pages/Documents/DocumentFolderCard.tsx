import {
  Briefcase,
  ChevronUp,
  Clock,
  EllipsisVertical,
  FileKey,
  FileSpreadsheet,
  FileText,
  FileVideoCamera,
  FileVolume,
  FolderOpen,
  Image,
  Tag,
} from "lucide-react";
import { useState } from "react";
import Card from "../../Components/Cards/Card";

interface DocumentProps {
  caseNumber: string;
  client: string;
  folders: Folders[];
}

interface Folders {
  description: string;
  contentType: string;
  version: string;
  date: string;
  folders: Folders[];
}

const DocumentFolderCard = ({ caseNumber, client, folders }: DocumentProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [openFolders, setOpenFolders] = useState<string[]>([]);

  const toggleFolder = (path: string) => {
    if (openFolders.includes(path)) {
      setOpenFolders(openFolders.filter((p) => p !== path));
    } else {
      setOpenFolders([...openFolders, path]);
    }
  };

  const returnContentTypeIcon = (contentType: string) => {
    switch (contentType.toLowerCase()) {
      case "mp4":
        return <FileVideoCamera className="text-purple-600" />;
      case "mp3":
        return <FileVolume className="text-yellow-500" />;
      case "pdf":
        return <FileKey className="text-red-700" />;
      case "xlsx":
        return <FileSpreadsheet className="text-green-700" />;
      case "docx":
        return <FileText className="text-blue-600" />;
      case "txt":
        return <FileText className="text-blue-600" />;
      default:
        return <Image className="text-gray-500" />;
    }
  };

  const renderItem = (
    item: Folders,
    index: number,
    path: string,
    depth: number,
  ) => {
    const isFolder = item.contentType.toLowerCase() === "folder";
    const currentPath = `${path}-${index}`;
    const isOpen = openFolders.includes(currentPath);

    if (!isFolder) {
      return (
        <div
          key={currentPath}
          className="grid grid-cols-40 hover:bg-gray-50 py-5 border-b border-gray-200"
          style={{ paddingLeft: `${depth * 48}px` }}
        >
          <div className="col-span-2 mx-auto"></div>

          <div className="col-span-1">
            {returnContentTypeIcon(item.contentType)}
          </div>

          <div className="col-span-9 ml-3">{item.description}</div>

          <div className="col-span-10 flex items-center">
            <Tag size={16} className="text-gray-500 mr-1" />
            {item.contentType || "N/A"}
          </div>

          <div className="col-span-10">
            <span className="border border-gray-200 rounded-full px-3 py-1 bg-green-200 text-green-600 font-semibold">
              {item.version || "1.0"}
            </span>
          </div>

          <div className="col-span-6 flex text-gray-500 items-center">
            <Clock size={16} className="mr-2" />
            {item.date}
          </div>

          <div>
            <EllipsisVertical />
          </div>
        </div>
      );
    }

    return (
      <div key={currentPath}>
        <div className="border-b border-gray-200">
          <div
            className={`grid grid-cols-40 hover:bg-gray-50 py-5 ${
              isOpen ? "" : "rounded-b-2xl"
            }`}
            onClick={() => toggleFolder(currentPath)}
            style={{ paddingLeft: `${depth * 48}px` }}
          >
            <div className="col-span-2 mx-auto">
              {isOpen ? <ChevronUp /> : <ChevronUp className="rotate-180" />}
            </div>

            <div className="col-span-1">
              <FolderOpen className="text-orange-300" />
            </div>

            <div className="col-span-9 ml-3">{item.description}</div>

            <div className="col-span-10 flex items-center">
              <Tag size={16} className="text-gray-500 mr-1" />
              {item.contentType}
            </div>

            <div className="col-span-10">
              <span className="border border-gray-200 rounded-full px-3 py-1 bg-green-200 text-green-600 font-semibold">
                {item.version}
              </span>
            </div>

            <div className="col-span-6 flex text-gray-500 items-center">
              <Clock size={16} className="mr-2" />
              {item.date}
            </div>
          </div>

          {isOpen &&
            item.folders.map((child, idx) =>
              renderItem(child, idx, currentPath, depth + 1),
            )}
        </div>
      </div>
    );
  };

  return (
    <Card className="m-6" removePadding={true}>
      <div
        className={`grid grid-cols-40 bg-gray-100 py-5 ${
          showDetails ? "rounded-t-2xl" : "rounded-2xl"
        }`}
      >
        <div className="col-span-2 mx-auto">
          <Briefcase className="text-blue-700" />
        </div>

        <div className="col-span-36">
          <span className="font-semibold mr-2">
            {caseNumber} - {client}
          </span>
          <span className="text-gray-500">({folders.length} items)</span>
        </div>

        <div className="col-span-2 m-auto">
          {showDetails ? (
            <ChevronUp onClick={() => setShowDetails(false)} />
          ) : (
            <ChevronUp
              className="rotate-180"
              onClick={() => setShowDetails(true)}
            />
          )}
        </div>
      </div>

      {showDetails &&
        folders.map((folder, index) => renderItem(folder, index, "root", 1))}
    </Card>
  );
};

export default DocumentFolderCard;
