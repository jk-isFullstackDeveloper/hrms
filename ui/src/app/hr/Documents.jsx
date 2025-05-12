import React, { useState } from "react";
import {
  FaFileAlt,
  FaFileContract,
  FaBriefcase,
  FaGraduationCap,
} from "react-icons/fa";
import { Eye, Download, FileText, X } from "lucide-react"; // Lucide for icons

const folders = [
  {
    title: "Offer Letters",
    icon: <FaFileContract className="text-blue-600 text-3xl" />,
    count: 3,
    documents: [
      {
        name: "Offer_Letter_JohnDoe.pdf",
        date: "2024-04-01",
        url: "/docs/Offer_Letter_JohnDoe.pdf",
      },
      {
        name: "Offer_Letter_JaneSmith.pdf",
        date: "2024-04-10",
        url: "/docs/Offer_Letter_JaneSmith.pdf",
      },
      {
        name: "Offer_Letter_MarkLee.pdf",
        date: "2024-04-18",
        url: "/docs/Offer_Letter_MarkLee.pdf",
      },
    ],
  },
  {
    title: "Experience Letters",
    icon: <FaBriefcase className="text-green-600 text-3xl" />,
    count: 2,
    documents: [
      {
        name: "Experience_JohnDoe.pdf",
        date: "2023-12-01",
        url: "/docs/Experience_JohnDoe.pdf",
      },
      {
        name: "Experience_JaneSmith.pdf",
        date: "2023-11-20",
        url: "/docs/Experience_JaneSmith.pdf",
      },
    ],
  },
  {
    title: "Education Documents",
    icon: <FaGraduationCap className="text-yellow-500 text-3xl" />,
    count: 2,
    documents: [
      {
        name: "Bachelors_JohnDoe.jpg",
        date: "2020-05-15",
        url: "/docs/Bachelors_JohnDoe.jpg",
      },
      {
        name: "Masters_JaneSmith.pdf",
        date: "2022-07-22",
        url: "/docs/Masters_JaneSmith.pdf",
      },
    ],
  },
  {
    title: "Personal Documents",
    icon: <FaFileAlt className="text-purple-600 text-3xl" />,
    count: 3,
    documents: [
      {
        name: "ID_Card_JohnDoe.jpg",
        date: "2022-01-01",
        url: "/docs/ID_Card_JohnDoe.jpg",
      },
      {
        name: "PAN_JaneSmith.pdf",
        date: "2021-09-15",
        url: "/docs/PAN_JaneSmith.pdf",
      },
      {
        name: "Passport_MarkLee.pdf",
        date: "2023-06-10",
        url: "/docs/Passport_MarkLee.pdf",
      },
    ],
  },
];

const HRDocumentSection = () => {
  const [activeFolder, setActiveFolder] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const isImage = (filename) => filename.match(/\.(jpeg|jpg|png|gif)$/i);

  return (
    <div className=" ">
      {/* Folder Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {folders.map((folder, index) => (
          <div
            key={index}
            onClick={() => setActiveFolder(index)}
            className={`flex items-center p-5 bg-white shadow-md rounded-xl hover:shadow-lg cursor-pointer transition-all duration-300 ${
              activeFolder === index ? "ring-2 ring-violet-400" : ""
            }`}
          >
            <div className="mr-4">{folder.icon}</div>
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                {folder.title}
              </h3>
              <p className="text-sm text-gray-500">{folder.count} files</p>
            </div>
          </div>
        ))}
      </div>

      {/* Document List */}
      {activeFolder !== null && (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {folders[activeFolder].title}
          </h2>
          <ul className="divide-y divide-gray-200">
            {folders[activeFolder].documents.map((doc, idx) => (
              <li key={idx} className="py-4 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {doc.name}
                  </p>
                  <p className="text-xs text-gray-500">Uploaded: {doc.date}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="rounded-full p-2 hover:bg-blue-100 transition"
                    title="View"
                  >
                    <Eye className="w-5 h-5 text-blue-600" />
                  </button>
                  <a
                    href={doc.url}
                    download
                    className="rounded-full p-2 hover:bg-green-100 transition"
                    title="Download"
                  >
                    <Download className="w-5 h-5 text-green-600" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedDoc && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setSelectedDoc(null)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          selectedDoc ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedDoc && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-indigo-600 text-white">
              <h3 className="text-lg font-semibold">View Docment</h3>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-white text-2xl leading-none hover:text-red-200"
              >
                &times;
              </button>
            </div>

            {/* Content */}
            <div className="p-5 flex items-center justify-center overflow-y-auto text-sm text-gray-700 space-y-4 h-[calc(100%-8rem)]">
              <FaFileAlt size={300} className="text-gray-200 text-xl" />
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t bg-indigo-50 text-xs text-gray-600 flex justify-between items-center">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700 transition"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HRDocumentSection;
