import { useState } from "react";
import Header from "../Components/Header/Header";
import SideModal from "../Components/Modal/SideModal";
import SortBar from "../Components/Inputs/SortBar";
import DocumentCard from "../Components/Cards/DocumentFolderCard";

const DocumentsPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
      const documents = [
        // --- Example 1: Small ---
        {
          caseNumber: "CASE-001",
          client: "Alice Johnson",
          folders: [
            {
              description: "Initial Filing",
              contentType: "PDF",
              version: "v1.0",
              date: "2025-01-10",
              folders: [],
            },
          ],
        },

        // --- Example 2: Medium (2 levels of nesting) ---
        {
          caseNumber: "CASE-002",
          client: "Beta Corp",
          folders: [
            {
              description: "Contracts",
              contentType: "FOLDER",
              version: "N/A",
              date: "2025-01-25", // earliest of children
              folders: [
                {
                  description: "Signed Copies",
                  contentType: "PDF",
                  version: "v1.1",
                  date: "2025-02-03",
                  folders: [],
                },
                {
                  description: "Drafts",
                  contentType: "DOCX",
                  version: "v0.9",
                  date: "2025-01-25",
                  folders: [],
                },
              ],
            },
          ],
        },

        // --- Example 3: Larger (multiple folders, some nested) ---
        {
          caseNumber: "CASE-003",
          client: "Omega Holdings",
          folders: [
            {
              description: "Financial Statements",
              contentType: "FOLDER",
              version: "N/A",
              date: "2024-12-20", // earliest
              folders: [
                {
                  description: "2024 Statements",
                  contentType: "XLSX",
                  version: "v1.2",
                  date: "2025-01-15",
                  folders: [],
                },
                {
                  description: "2023 Statements",
                  contentType: "XLSX",
                  version: "v3.0",
                  date: "2024-12-20",
                  folders: [],
                },
              ],
            },
            {
              description: "Audits",
              contentType: "PDF",
              version: "v2.5",
              date: "2025-02-22",
              folders: [],
            },
          ],
        },

        // --- Example 4: Deeply Nested (3 levels) ---
        {
          caseNumber: "CASE-004",
          client: "Zeta Industries",
          folders: [
            {
              description: "Evidence",
              contentType: "FOLDER",
              version: "N/A",
              date: "2025-03-27", // earliest of all nested
              folders: [
                {
                  description: "Images",
                  contentType: "FOLDER",
                  version: "N/A",
                  date: "2025-03-27", // earliest child
                  folders: [
                    {
                      description: "High-Res",
                      contentType: "JPEG",
                      version: "v1.0",
                      date: "2025-03-28",
                      folders: [],
                    },
                    {
                      description: "Low-Res",
                      contentType: "JPEG",
                      version: "v1.0",
                      date: "2025-03-27",
                      folders: [],
                    },
                  ],
                },
                {
                  description: "Videos",
                  contentType: "MP4",
                  version: "v1.1",
                  date: "2025-03-30",
                  folders: [],
                },
              ],
            },
          ],
        },

        // --- Example 5: Very Large & Complex ---
        {
          caseNumber: "CASE-005",
          client: "Delta Legal Group",
          folders: [
            {
              description: "Correspondence",
              contentType: "FOLDER",
              version: "N/A",
              date: "2025-02-10",
              folders: [
                {
                  description: "Incoming",
                  contentType: "MSG",
                  version: "v2.0",
                  date: "2025-02-10",
                  folders: [],
                },
                {
                  description: "Outgoing",
                  contentType: "MSG",
                  version: "v2.1",
                  date: "2025-02-11",
                  folders: [],
                },
              ],
            },
            {
              description: "Court Documents",
              contentType: "FOLDER",
              version: "N/A",
              date: "2025-02-20",
              folders: [
                {
                  description: "Motions",
                  contentType: "FOLDER",
                  version: "N/A",
                  date: "2025-02-20",
                  folders: [
                    {
                      description: "Filed",
                      contentType: "PDF",
                      version: "v1.0",
                      date: "2025-02-28",
                      folders: [],
                    },
                    {
                      description: "Drafts",
                      contentType: "DOCX",
                      version: "v0.8",
                      date: "2025-02-20",
                      folders: [],
                    },
                  ],
                },
                {
                  description: "Transcripts",
                  contentType: "TXT",
                  version: "v2.0",
                  date: "2025-03-12",
                  folders: [],
                },
              ],
            },
            {
              description: "Research",
              contentType: "PDF",
              version: "v1.7",
              date: "2025-01-12",
              folders: [],
            },
          ],
        },
      ];


    const handleShowModal = (show: boolean) =>{
        setShowModal(show);
    }


    const renderModal = () => {
    if (!showModal) return null;
    return (
      <SideModal setShowModal={setShowModal} title="New Court Case" />
    );
    }

    return (
      <>
        <Header
          title="Document Management"
          showButton={true}
          buttonCaption="Add New Document"
          key={1}
          handleShowModal={handleShowModal}
        />
        <SortBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {documents.map((documents, index) => (
          <DocumentCard
            key={index}
            caseNumber={documents.caseNumber}
            client={documents.client}
            folders={documents.folders}
          />
        ))}
        {renderModal()}
      </>
    );
}

export default DocumentsPage;