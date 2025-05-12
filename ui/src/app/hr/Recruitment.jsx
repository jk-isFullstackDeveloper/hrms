import { useState } from "react";
import { Eye, Download } from "lucide-react";

const candidates = [
  {
    id: 1,
    name: "Amit Sharma",
    position: "Frontend Developer",
    status: "Interview Scheduled",
    resume: "/resumes/amit-sharma.pdf",
    appliedDate: "2025-04-10",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg", // Or a default image
    details:
      "Amit is an experienced frontend developer with expertise in React.js and JavaScript.",
  },
  {
    id: 2,
    name: "Priya Mehta",
    position: "Backend Developer",
    status: "Resume Reviewed",
    resume: "/resumes/priya-mehta.pdf",
    appliedDate: "2025-04-08",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg", // Or a default image
    details:
      "Priya is a skilled backend developer proficient in Node.js and MongoDB.",
  },
  {
    id: 3,
    name: "Rahul Verma",
    position: "UI/UX Designer",
    status: "Offer Sent",
    resume: "/resumes/rahul-verma.pdf",
    appliedDate: "2025-04-05",
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg", // Or a default image
    details:
      "Rahul is a creative UI/UX designer with a passion for creating seamless user experiences.",
  },
];

export default function HrRecruitment() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          HR Recruitment
        </h2>
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-gray-50 hover:bg-gray-100 transition-all p-4 rounded-xl flex items-center justify-between shadow-sm cursor-pointer"
              onClick={() => setSelectedCandidate(candidate)}
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    candidate.profileImage || "https://via.placeholder.com/100"
                  }
                  alt={candidate.name}
                  className="w-10 h-10 rounded-full object-cover ring-4 ring-indigo-200 shadow-sm"
                />
                <div>
                  <p className="text-sm  font-medium text-gray-900">
                    {candidate.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {candidate.position} • <span>{candidate.appliedDate}</span>
                  </p>
                  <span className="inline-block text-xs mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {candidate.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 rounded-full hover:bg-blue-100 transition"
                  title="View Resume"
                >
                  <Eye className="w-5 h-5 text-blue-600" />
                </button>
                <a
                  href={candidate.resume}
                  download
                  title="Download Resume"
                  className="p-2 rounded-full hover:bg-green-100 transition"
                >
                  <Download className="w-5 h-5 text-green-600" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BACKDROP */}
      {selectedCandidate && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setSelectedCandidate(null)}
        />
      )}


      {/* SIDEBAR DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          selectedCandidate ? "translate-x-0" : "translate-x-full"
        }`}
      >
        


        {selectedCandidate && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-indigo-600 text-white">
              <h3 className="text-lg font-semibold">Candidate Details</h3>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-white text-2xl leading-none hover:text-red-200"
              >
                &times;
              </button>
            </div>

            {/* Content */}
            <div className="p-5 overflow-y-auto text-sm text-gray-700 space-y-4 h-[calc(100%-8rem)]">
              {selectedCandidate && (
                <>
                  <h3 className="text-sm font-semibold text-gray-800 mb-4">
                    {selectedCandidate.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    {selectedCandidate.position}
                  </p>
                  <img
                    src={
                      selectedCandidate.profileImage ||
                      "https://via.placeholder.com/100"
                    }
                    alt={selectedCandidate.name}
                    className="w-10 h-10 rounded-full object-cover ring-4 ring-indigo-200 shadow-sm"
                  />
                  <p className="text-gray-700 mb-4 text-sm">
                    {selectedCandidate.details}
                  </p>
                  <a
                    href={selectedCandidate.resume}
                    download
                    className="inline-flex text-xs items-center gap-2 text-blue-600 font-medium hover:underline"
                  >
                    <Download className="w-5 h-5" />
                    Download Resume
                  </a>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t bg-indigo-50 text-xs text-gray-600 flex justify-between items-center">
              <button
                onClick={() => setSelectedCandidate(null)}
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
}
