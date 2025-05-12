import React, { useState, useEffect } from "react";
import { getAllUsersList } from "../../api/user";
import AvatarGroup from "./AvatarGroup";
import { Users } from "lucide-react";

const ChatList = ({ onSelectionChange, onCreateGroup }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [singleSelectedUser, setSingleSelectedUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isGroupMode, setIsGroupMode] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getAllUsersList();
    setUsers(data.data);
  };

  const toggleUserSelection = (user) => {
    if (isGroupMode) {
      setSelectedUsers((prev) =>
        prev.some((u) => u._id === user._id)
          ? prev.filter((u) => u._id !== user._id)
          : [...prev, user]
      );
    } else {
      setSingleSelectedUser(user);
      if (onSelectionChange) onSelectionChange(user);
      setMenuOpen(false);
    }
  };
 

  return (
    <div
      className={`md:w-1/3 bg-white border-r p-4 transition-transform ${
        menuOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 fixed md:static h-full md:h-auto border border-2 border-violet-500 overflow-hidden pb-6`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Chats</h2>
        {isGroupMode && (
          <AvatarGroup size={"md"} maxVisible={5} users={selectedUsers} />
        )}

        
      </div>
       
      <div className="overflow-auto h-[80vh]">
        {
        users.map((user, inx) => {
          const isSelected = isGroupMode
            ? selectedUsers.some((u) => u._id === user._id)
            : singleSelectedUser?._id === user._id;

          return (
            <div
              key={user._id}
              className={`flex items-center p-3 mb-1 rounded-lg cursor-pointer ${
                isSelected ? "bg-violet-200" : "hover:bg-gray-100"
              }`}
              onClick={() => toggleUserSelection(user)}
            >
              <div className="relative">
                {user.type === "user" ? (
                  <img
                    className="w-8 h-8 rounded-full ring ring-round-4"
                    src={`https://i.pravatar.cc/100?img=${inx}`}
                    alt={"images"}
                  />
                ) : (
                  <div className=" flex items-center justify-around gap-2 w-8 h-8 rounded-full ring ring-rose-4">
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                )}
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-xs font-semibold">{user?.email}</h3>
                <p className="text-[10px] capitalize text-gray-600 truncate">
                  {user?.role}
                </p>
                <h3 className="text-sm font-semibold">{user?.name}</h3>
                <p className="text-[10px] capitalize text-gray-600 truncate">
                  {user?.type === "group" &&
                    "Group Members " + user.members.length}
                </p>
                <p className="text-sm text-gray-600 truncate">
                  {user?.lastMessage}
                </p>
              </div>
              {isGroupMode && (
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleUserSelection(user)}
                  className="ml-2"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
