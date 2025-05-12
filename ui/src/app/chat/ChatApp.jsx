import { useState } from "react";
import ChatList from "./ChatList";
import { useAuth } from "../../context/AuthContext";
import ChatWindow from "./ChatWindow";
import { createGroup } from "../../api/group";

const ChatApp = () => {
  const { user } = useAuth();
  const [selectedUsers, setSelectedUsers] = useState(null);
 
  const handleSelectionChange = async (newSelectedUsers) => {
    setSelectedUsers(newSelectedUsers);
   
  };

  function getRoomId(userId1, userId2) {
    return [userId1].sort().join("_");
  }

  const handleCreateGroup = async (grup) => {
    const res = await createGroup({
      members: grup,
      admin: [user._id],
      name: "Demo",
    });
    console.log(res);
  };
  console.log(selectedUsers, "ss");
  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col md:flex-row bg-gray-50 border border-r-2 border-violet-500 ">
      {/* Chat List */}
      <ChatList
        onSelectionChange={handleSelectionChange}
        onCreateGroup={handleCreateGroup}
      />
      {/* Chat Window */}
      <ChatWindow
         
        currentUserId={user._id}
        selectedUsers={selectedUsers}
        roomId={
          selectedUsers?.type === "user"
            ? getRoomId(user?._id, selectedUsers?._id)
            : selectedUsers?._id
        }
      />
    </div>
  );
};
export default ChatApp;
