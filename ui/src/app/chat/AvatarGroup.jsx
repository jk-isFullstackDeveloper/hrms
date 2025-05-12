import { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";

const AvatarGroup = ({ users, size = "md", maxVisible = 3 }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  const visibleUsers = users.slice(0, maxVisible);
  const extraUsers = users.slice(maxVisible);
  const extraCount = extraUsers.length;
  const [search, setSearch] = useState("");

  const filteredMembers = users.filter((member) =>
    member?.name?.toLowerCase().includes(search?.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setShowTooltip(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      <div className="flex -space-x-2">
        {visibleUsers.map((user, index) => (
          <Avatar
            key={user._id || index}
            src={user.avatar || `https://i.pravatar.cc/150?img=${index + 1}`}
            alt={user.name}
            size={size}
          />
        ))}
        {extraCount > 0 && (
          <div
            onClick={() => setShowTooltip(!showTooltip)}
            className={`flex items-center justify-center rounded-full bg-gray-300 text-gray-800 text-xs font-medium border-2 border-white cursor-pointer transition-all duration-200 ${
              size === "sm"
                ? "w-6 h-6"
                : size === "lg"
                ? "w-12 h-12"
                : "w-10 h-10"
            }`}
          >
            +{extraCount}
          </div>
        )}
      </div>

      {showTooltip && (
        <div
          ref={tooltipRef}
          className="absolute shadow-lg bg-slate-200  left-1/2 z-10 mt-2 w-[250px] -translate-x-1/2 rounded-md   border border-gray-200 p-2"
        >
          <div className="absolute bg-slate-200 -top-[7px] right-12 w-3 h-3  border-l border-t border-gray-200 rotate-45 z-0" />
          <p className="text-xs font-semibold mb-1 text-gray-700 z-10 relative">
            Group Members
          </p>
          <input
            type="text"
            placeholder="Search members"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-2 py-2 mb-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500"
          />
          <ul className="max-h-48 overflow-auto text-sm text-gray-700 z-10 relative custom-scrollbar pr-2 ">
            {extraUsers.map((user, idx) => (
              <li
                key={user._id || idx}
                className="cursor-pointer flex items-center gap-3 py-2 px-2 hover:bg-gray-50   rounded-md"
              >
                {/* Avatar */}
                <img
                  src={
                    user.avatar || `https://i.pravatar.cc/150?img=${idx + 10}`
                  }
                  alt={user.name}
                  className="w-8 h-8 rounded-full border border-gray-300 shadow-sm"
                />

                {/* Info */}
                <div className="flex flex-col text-xs">
                  <span className="font-medium text-gray-800 truncate">
                    {user.email}
                  </span>
                  <span className="text-[11px] text-gray-500 capitalize truncate">
                    {user.role}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
