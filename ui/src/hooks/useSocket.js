// src/hooks/useSocket.js
import { useEffect } from "react";
import { initiateSocket, getSocket, disconnectSocket } from "../utils/socket.js";

export const useSocket = (userId, onNotification) => {
  useEffect(() => {
    if (userId) {
      initiateSocket(userId);
      const socket = getSocket();

      socket.on("notification", (data) => {
        console.log("🔔 Notification received:", data);
        if (onNotification) onNotification(data);
      });

      return () => {
        disconnectSocket();
      };
    }
  }, [userId]);
};
